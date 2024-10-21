<div align="center">
    
![Xyetro Logo](icons/128.png)

<h1>XYETPO</h1>
</div>

> [!TIP]
> Самая точная карта метро Москвы и Питера.

Это расширение для браузера Google Chrome делает сервис [Яндекс Метро](https://yandex.ru/metro) наконец-то пригодным для использования пассажирами.

> **X**tensible  
> **Y**andex Metro  
> **E**ntertaining  
> **T**ransit  
> **P**lanning  
> **O**ptimizer

# 🛠 Установка

- [Google Chrome](#google-chrome-или-chromium)
- [Opera](#opera)

## Google Chrome (или Chromium)

> [!TIP]
> Расширение можно скачать из [Chrome Web Store](https://chromewebstore.google.com/detail/xyetpo/hnajaplcneokjbgldkgmckimhagdilmo).

#### ИЛИ установить вручную

1. Скачайте архив с расширением [отсюда](https://github.com/tikhonp/xyetpo/tags): выберите последнюю версию и нажмите ZIP.

2. Распакуйте архив в удобное место на вашем компьютере.

3. Откройте браузер Google Chrome и перейдите по адресу `chrome://extensions/`.

4. Включите режим разработчика в правом верхнем углу.

5. Нажмите на кнопку "Загрузить распакованное расширение" ("Load unpacked") и выберите папку, в которую вы распаковали архив.

6. Готово! Теперь вы можете зайти на [Яндекс Метро](https://yandex.ru/metro) и пользоваться расширением!

## Opera 

1. Скачайте плагин с расширением `.crx` [отсюда](https://github.com/tikhonp/xyetpo/releases/latest/download/xyetro.crx).

2. Откройте браузер Opera и перейдите по адресу `opera://extensions/`.

3. Перетащите скачанный файл `xyetpo.crx` в окно браузера.

4. Нажмите "Установить", затем подтвердите установку.

5. Отметьте галочкой "Разрешить доступ к результатам страницы поиска" (Allow access to search page results).

6. Готово! Теперь вы можете зайти на [Яндекс Метро](https://yandex.ru/metro) и пользоваться расширением!

# 📝 Сборка файла crx самостоятельно

Для этого требуется `go` версии 1.22 и выше, а также Google Chrome, установленный на macOS.

1. Склонируйте репозиторий:

```bash
git clone https://github.com/tikhonp/xyetpo.git
cd xyetpo
```

2. Соберите файл `xyetro.crx`:

```bash
go run build_crx.go
```

3. Готово! Файл `xyetro.crx` будет находиться в корне проекта.

# ❤️ Ошибки и неточности

Если вы заметили ошибку или неточность в карте, пожалуйста, создайте [Issue](https://github.com/tikhonp/xyetpo/issues/new) или Pull Request.

