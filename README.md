# nodejs-scraping-boilerplate

Шаблоны для скрапинга сайтов на node.js. Для того, чтобы всё работало нормально, нужен node.js больше 16 версии (из-за puppeteer, все остальное и на более ранних версиях должно работать). У меня на данный момент стоит версия 18.16.0.

Первоначально я занимался веб-скрапингом на python-е. Но там были проблемы с "puppeteer". Поскольку большую чать времени я  занимаюсь frontend-разработкой, мне "javascript" ближе. Однажды я нашел очень хорошую [статью](https://habr.com/ru/articles/301426/) по данной теме, конечно она старая, но некоторые вещи еще актуальны. Здесь я выложу простенькие примеры, для того, чтобы не писать код с нуля.

Сразу стоит сказать, кто хочет более подробно освоить скрапинг на "JS", я советую попробовать [данную библиотеку](https://crawlee.dev/). Она довольно таки часто обновляется, имеет хорошую документацию, ее поддерживает хорошая команда разработчиков. Я думаю, что если все останется так, как есть, то лет через 5-10 скрапингом на python-е никто заниматься не будет.

Доступно для запуска 16 команд:

* npm run scrapy:static. Данная команда показывает пример скрапинга простенького сайта. В качестве примера я буду скрапить статьи [российского экономиста Михаила Леонидовича Хазина](https://khazin.ru/articles/). Для скрапинга я использую следующие модули - "tress", "cheerio", "needle", "fs", "cllc". Задержку между переходами я сделаю в одну секунду. В принципе хватит и 400-600 мс, но я ее сделаю побольше. Когда скрипт закончит выполняться, на выходе мы получим "data.json" с номером страницы, ссылкой на статью, заголовком статьи. Так же мы получим папку "/results/hazin_results" со всеми статьями Михаила Леонидовича. Я думаю он на это не обидется. Все его статьи я сохраню исключительно в учебных целях, какую-то комерческую выгоду я из этого получить не планирую. Самая ранняя его статья датируется 2003 годом, заодно можно посмореть, сбылись ли его предсказания, пока я его в неточности уличить не смог)))
* npm run scrapy:browser. Это пример более сложного скрапинга. В данном примере я использую библиотеку "puppeteer" для авторизации на сайте, и сбора информации после регистрации. Для  этого я рядом поднимаю локальный сервер, меня перекидывает на keycloak, я там ввожу имя и пароль, меня возвращает обратно, я собираю интересующие меня ссылки, и прохожу по ним, результаты я сохраняю в папку results. Как правило это нужно для скрапинга "SPA-приложений". В принципе код там достаточно простой, я все достаточно хорошо комментировал, я думаю проблем возникнуть не должно.
* npm run scrapy:shop. Это пример парсинга книжных интерент-магазинов. Все типовые принципы, которые применяются в скрапинге можно будет посмотреть на этой команде. Данная команда запускает два спайдера. Спайдер "cgShopSpider.js" сперва запускает браузер, он нужен для того, чтобы получить токен. Токен данный интернет магазин передает через куки. Затем я беру данный токен и делаю запросы через библиотеку "needle". На выходе я получу json-файл с искомыми мне товарами, старый json-файл если он есть, будет переименован. Спайдер "lbShopSpider.js" просто проходит разводящие страницы интерент-магазина и собирает данные с этой страницы. На выходе я так-же получу json-файл, старый json-файл если он есть, так-же будет переименован. В принципе это типовые вещи.
* npm run scrapy:documents. Это команда пример парсинга документов на сайте, в данном примере я скачаиваю все картинки. Иногда бывает необхлдимость скачать с сайта все картинки, все pdf-файлы, или другие документы. Спайдер "documents.js" отлично показывает как это делать.
* npm run scrapy:work. Еще один пример парсинга сайта со статичной информацией. Тут нужно оговориться, что то, что я собираю лучше собирать через API. У данного сайта оно есть и достаточно хорошее. Я это делаю для примера.  На выходе я получу папку с вакансией, внутри будет папка с датой вакансии, и в ней сохраненные вакансии. Все это будет лежать в папке "/results".
* npm run scrapy:work:browser. Еще один пример парсинга сайта со статичной информацией, на этот раз я это делаю через "puppeteer". Вначале я иду на разводящую страницу с вакансиями, щелкаю по каждой кнопке, чтобы подгрузились вакансии. Дальше я делаю screenshot разводящей и перехожу по каждой вакансии. Если я нахожу интересующую меня вакансию, то я делаю ее screenshot. На выходе я получу папку с вакансией, внутри будет папка с датой вакансии, и в ней сохраненные вакансии с папкой скринщотов. Все это будет находиться в папке "/results". Данный пример делается исключительно в учебных целях, у данного сайта есть хорошее API и так по хорошему стоит делать через него.
* npm run scrapy:work:db:browser. Данная команда делает все тоже самое, что и предыдущая (npm run scrapy:work:browser), только результаты записываются в базу данных.
* npm run scrapy:company. Это простой пример, как на "puppeteer" можно пройти по разводящей новостей. В качестве примера я взял сайт компании в которой раньше работал. Обычно такие вещи на "puppeteer" не делаются, он слишком ресурсоемкий, я здесь оставил для примера.
* npm run analitics. Это решение не типовое, обычно аналитику делает нейросеть. В мою задачу входит собрать данные и записать их в базу данных, или json-файл. Напомню, команды "npm run scrapy:shop" создает json-файл с товарами, если файл существуют, то краулеры их переименуют. В общем данная команда их сравнивает, и создает третий json-файл с новыми товарами. Я могу запустить аналитику раз в месяц, раз  в неделю, и всегда буду знать какие появились новые книги.
* npm run server:static. Данная команда запускает локальный сервер на "express.js". Это пример простенького микросервиса. Очень часто я собираю какие-то данные, а потом заказчик просит их показать в удобной ему форме, чтобы оценить все ли я собрал. Как правило отобразить собранные данные из базы данных, или json-файлов. В данном примере я отображаю данные из книжных интернет-магазинов, и данные аналитики (новые товары). В качестве шаблонизатора я использую "pug".
* npm run server:react. По сути это команда делает все, тоже самое, что и предыдущая команда ("npm run server:static"), только серверную часть я генерю на react-е ("SSR"). Перед тем, как набрать данную команду, нужно набрать "npm run compile:react", или по отдельности "npm run compile:react:ssr:prod" и "npm run compile:react:front:prod", хотя бы один раз, и дождаться выполнения данных команд, все зависит от компа, но вообще это не должно занять многов времени. Я генерю "CSS", "JS" для фронта, и компоненты для "SSR". Без них данная команда не запустится, скорее всего будет ошибка.
* npm run compile:react. Эта команда нужна для компиляции "SSR" компонентов, и для сборки итогового "JS" и "CSS". Она запускает "npm run compile:react:ssr:prod" и "npm run compile:react:front:prod".
* npm run compile:react:ssr:dev. Эта команда нужна для преобразования компонентов "react" в исполняемый "JS" (по умолчанию node.js компоненты jsx не понимает, и исполнить их не сможет). Для компиляции компонентов я использую сборщик "rollup.js", он для этого идеально подходит. Данная команда компилирует файлы в режиме реального времени.
* npm run compile:react:ssr:prod. Эта команда нужна для преобразования компонентов "react" в исполняемый js (по умолчанию node.js компоненты "JSX" не понимает, и исполнить их не сможет). Для компиляции компонентов я использую сборщик "rollup.js", он для этого идеально подходит.
* npm run compile:react:front:dev. Эта команда нужна для сборки "JS" в режиме разработки. "JS" и "CSS" будут не минимизированы. "JS" будет содержать "sourcemap". Локальный сервер я не разворачиваю, все равно я использую "express.js".
* npm run compile:react:front:prod. Эта команда нужна для сборки итогового "JS". "JS" и "CSS" будут сжаты, "sourcemap-а" не будет.

Смотрите, если вы наберете в консоли "npm run server:react", выполнив перед этим хотя бы раз команду "npm run compile:react", то откроется мое приложения для парсинга книжных интернет-магазинов. Первоначально я его планировал как простенький шаблон для вывода результата парсинга. Я попробовал его использовать, в общем приходится очень много удалять, с простеньким шаблоном я не угадал. И в тоже время я его оставлю, потому что этим приложением я часто пользуюсь.

Если вы выполните данную команду ("npm run server:react"), то мое приложение будет доступно вот по этому адресу "http://localhost:8000/". Главная страница представляет из себя результаты парсинга интернет-магазинов. Если вы первый раз откроете приложение, то скорее всего у вас ничего не будет. Нажмите кнопку "скрапинг интернет-магазинов". Я паршу 2 самых популярных книжных интернет-магазина в России. Если вы первый раз вошли в мое приложение, то страницы "новые товары" будут пустыми, вам где-то через неделю нужно будет повторно нажать кнопку "скрапинг интернет-магазинов". После того, как скрапинг закончится, нужно будет нажать кнопку "Анализировать". Если появились новые товары, то страницы с новыми товарами будут заполнены, для меня это очень удобно.

Смотрите, страница "поиск по запросам" содержит форму поиска по интернет-магазинам. По умолчанию я ищу следующие запросы: "Javascript", "Python", "React", "Angular", "Typescript". На этой странице можно ввести интересующий вас запрос. Сразу хочу оговориться один из интернет-магазинов ищет только если запрос содержит латинские буквы. При кирилице все ляжет, и поиск идет только по тематике программирование. Прикручивать модуль который будет запросы из кирилицы переводить в латиницу мне не охото, да и что программист может искать на кирилице.

Если вы находитесь на главной странице, то у вас подгрузятся все найденные товары. Если вы будете переходить по страницам, но новых ajax-запросов не будет. Все результаты уже есть на главной странице. Если вы к примеру  зашли в придожение со странице "javascript", то при переходе на страницу "react" будет осуществлен ajax-запрос для получение данных по странице react. При повторном переходе по стрницам "javascript", "react" ajax-запросов не будет, все данные у вас уже есть. Это применимо ко всем страницам.