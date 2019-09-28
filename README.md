#Парсер отзывов о продавце на Яндекс.Марект
##Модуль парсера <code>/src/parser/</code>
<ul>
<li>Точка входа <code>parser.ts</code></li>
<li>Конфигурация <code>/src/config.ts</code></li>
<li>Полученные данные пишутся в БД, конфигурация БД в файле конфигурации.
БД должна быть в кодировке utf8mb4, иначе парсер будет крашиться на записях,
в которых есть эмоджи.</li>
</ul>

##API
Построено на <code>@nestjsx/crud</code>

##ToDo
<li>На данный момент проблемма с импортом модулей, поэтому есть костыль: конфиг БД
для парсера надходится в <code>/src/config.js</code>, а для API в <code> ormconfig.json</code></li>
<li>Для решения капчи используется сторонний модуль. Автор получает 10% - надо делать свой</li>


