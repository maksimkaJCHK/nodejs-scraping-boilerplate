# nodejs-scraping-boilerplate

Шаблоны для скрапинга сайтов на node.js. Для того, чтобы всё работало нормально, нужен node.js больше 16 версии (из-за puppeteer, все остальное и на более ранних версиях должно работать). У меня на данный момент стоит версия 18.16.0.

Первоначально я занимался веб-скрапингом на python-е. Но там были проблемы с puppeteer. Поскольку я больше занимаюсь frontend разработкой, мне javascript ближе. Однажды я нашел очень хорошую [статью](https://habr.com/ru/articles/301426/) по данной теме, конечно она старая, но некоторые вещи еще актуальны. Здесь я выложу простенькие примеры, для того, чтобы не писать код с нуля.

Доступно для запуска 8 команд:

* npm run scrapy:static. Данная команда показывает пример скрапинга простенького сайта. В качестве примера я буду скрапить статьи [российского экономиста Михаила Леонидовича Хазина](https://khazin.ru/articles/). Для скрапинга я использую следующие модули - tress, cheerio, needle, fs, cllc. Задержку между переходами я сделаю в одну секунду. В принципе хватит и 400-600 мс, но я ее сделаю побольше. Когда скрипт закончит выполняться, на выходе мы получим data.json с номером страницы, ссылкой на статью, заголовком статьи. Так же мы получим папку "/results/hazin_results" со всеми статьями Михаила Леонидовича. Я думаю он на это не обидется. Все его статьи я сохраню исключительно в учебных целях, какую-то комерческую выгоду я из этого получить не планирую. Самая ранняя его статья датируется 2003 годом, заодно можно посмореть, сбылись ли его предсказания, пока я его в неточности уличить не смог)))
* npm run scrapy:browser. Это пример более сложного скрапинга. В данном примере я использую библиотеку puppeteer для авторизации на сайте, и сбора информации после регистрации. Для  этого я рядом поднимаю локальный сервер, меня перекидывает на keycloak, я там ввожу имя и пароль, меня возвращает обратно, я собираю интересующие меня ссылки, и прохожу по ним, результаты я сохраняю в папку results. В принципе код там достаточно простой, я все достаточно хорошо комментировал, я думаю проблем возникнуть не должно.
* npm run scrapy:shop. Это пример парсинга книжных интерент-магазинов. Все типовые принципы, которые применяются в скрапинге можно будет посмотреть на этой команде. Данная команда запускает два спайдера. Спайдер "cgShopSpider.js" сперва запускает браузер, он нужен для того, чтобы получить токен. Токен данный интернет магазин передает через куки. Затем я беру данный токен и делаю запросы через библиотеку "needle". На выходе я получу json-файл с искомыми мне товарами, старый json-файл если он есть, будет переименован. Спайдер "lbShopSpider.js" просто проходит разводящие страницы интерент-магазина и собирает данные с этой страницы. На выходе я так-же получу json-файл, старый json-файл если он есть, так-же будет переименован. В принципе это типовые вещи.
* npm run scrapy:documents. Это команда пример парсинга картинок на сайте. Иногда бывает необхлдимость скачать с сайта все картинки, все pdf-файлы, или другие документы. Спайдер "documents.js" отлично показывает как это делать.
* npm run analitics. Это решение не типовое, обычно аналитику делает нейросеть. В мою задачу входит собрать данные и записать их в базу данных, или json-файл. Напомню, команды "npm run scrapy:shop" создает json-файл с товарами, если файл существуют, то спайдеры их переименуют. В общем данная команда их сравнивает, и создает третий json-файл с новыми товарами. Я могу запустить аналитику раз в месяц, раз  в неделю, и всегда буду знать какие появились новые книги.
* npm run server:static. Данная команда запускает локальный сервер на "express.js". Это пример простенького микросервиса. Очень часто я собираю какие-то данные, а потом заказчик просит их показать в удобной ему форме, чтобы оценить все ли я собрал. Как правило отобразить собранные данные из базы данных, или json-файлов. В данном примере я отображаю данные из книжных интернет-магазинов, и данные аналитики (новые товары). В качестве шаблонизатора я использую "pug".
* npm run server:react. По сути это команда делает все, тоже самое, что и предыдущая команда ("npm run server:static"), только серверную часть я генерю на react-е ("SSR").
* npm run compile:react. Эта команда нужна для преобразования компонентов "react" из "es6" формата, в формат "cjs" ("Node.js" понимает только "cjs" формат). Для компиляции компонентов я использую сборщик "rollup.js", он для этого идеально подходит. Данная команда компилирует файлы в режиме реального времени.
