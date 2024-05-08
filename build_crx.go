package main

import (
	"bytes"
	"fmt"
	"log"
	"os"
	"os/exec"
)

const chrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
const build_dir = "xyetro"

func copyDir(src string, dst string) {
	entries, err := os.ReadDir(src)
	if err != nil {
		log.Fatalf("Error reading %s: %v", src, err)
	}
	if _, err := os.Stat(dst); os.IsNotExist(err) {
		if err := os.Mkdir(dst, os.ModePerm); err != nil {
			log.Fatalf("Error creating %s: %v", dst, err)
		}
	} else if err != nil {
		log.Fatalf("Error checking for %s: %v", dst, err)
	}
	for _, entry := range entries {
		srcPath := fmt.Sprintf("%s/%s", src, entry.Name())
		dstPath := fmt.Sprintf("%s/%s", dst, entry.Name())
		if entry.IsDir() {
			if _, err := os.Stat(dstPath); os.IsNotExist(err) {
				if err := os.Mkdir(dstPath, os.ModePerm); err != nil {
					log.Fatalf("Error creating %s: %v", dstPath, err)
				}
			}
			copyDir(srcPath, dstPath)
		} else {
			copy(srcPath, dstPath)
		}
	}
}

func copy(src string, dst string) {
	data, err := os.ReadFile(src)
	if err != nil {
		log.Fatalf("Error reading %s: %v", src, err)
	}
	err = os.WriteFile(dst, data, 0644)
	if err != nil {
		log.Fatalf("Error writing %s: %v", dst, err)
	}
}

func createEnv() {
	// Check if chrome exists
	if _, err := os.Stat(chrome); os.IsNotExist(err) {
		log.Println("Google Chrome not found at ", chrome)
		os.Exit(1)
	}

	// Check if build directory exists and remove it if it does
	if _, err := os.Stat(build_dir); err == nil {
		os.RemoveAll(build_dir)
	} else if !os.IsNotExist(err) {
		log.Fatalf("Error checking for %s: %v", build_dir, err)
	}

	// Check if output file exists and remove it if it does
	output := fmt.Sprintf("%s.crx", build_dir)
	if _, err := os.Stat(output); err == nil {
		os.Remove(output)
	} else if !os.IsNotExist(err) {
		log.Fatalf("Error checking for %s: %v", output, err)
	}
}

func createBuildDir() {
	if err := os.Mkdir(build_dir, os.ModePerm); err != nil {
		log.Fatalf("Error creating %s: %v", build_dir, err)
	}
	copy("background.js", fmt.Sprintf("%s/background.js", build_dir))
	copy("content_script.js", fmt.Sprintf("%s/content_script.js", build_dir))
	copyDir("icons", fmt.Sprintf("%s/icons", build_dir))
	copy("manifest.json", fmt.Sprintf("%s/manifest.json", build_dir))
	copy("stations_data.json", fmt.Sprintf("%s/stations_data.json", build_dir))
}

func packExtension() {
	pemFile := fmt.Sprintf("%s.pem", build_dir)
	var cmd *exec.Cmd
	if _, err := os.Stat(pemFile); err == nil {
		cmd = exec.Command(chrome, "--pack-extension="+build_dir, "--pack-extension-key="+pemFile)
	} else if os.IsNotExist(err) {
		log.Println("No pem file found, packing extension without key")
		cmd = exec.Command(chrome, "--pack-extension="+build_dir)
	} else {
		log.Fatalf("Error checking for %s: %v", pemFile, err)
	}
	var stderr bytes.Buffer
	cmd.Stderr = &stderr
	err := cmd.Run()
	if err != nil {
		log.Fatalf("Packing failed with %s\n    %s\n", err, stderr.String())
	}
	os.RemoveAll(build_dir)
}

func main() {
	createEnv()
	createBuildDir()
	packExtension()
	log.Println("Extension packed successfully")
}
