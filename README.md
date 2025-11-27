# cor
# Сапевари — Сайт о грузинской кухне



## Описание проекта

**Сапевари** — это интерактивный веб-сайт, посвященный богатой и самобытной кухне Грузии. Проект предназначен для всех любителей вкусно поесть, путешественников, планирующих поездку в Грузию, и просто curious minds, желающих познакомиться с культурой через ее гастрономию.

**Основные функции:**
 **Каталог блюд:** Удобная галерея с описанием самых популярных грузинских блюд (хачапури, хинкали, сациви и др.).
   **Поиск и фильтрация:** Поиск блюд по названию и фильтрация по категориям (выпечка, мясо, супы, соусы).
 **Избранное:** Возможность добавлять понравившиеся рецепты в избранное для быстрого доступа.
 **Адаптивный дизайн:** Сайт корректно отображается на всех устройствах: от смартфонов до десктопов.

 Установка и запуск

Чтобы запустить проект у себя локально, выполните следующие шаги:

1.  **Клонируйте репозиторий:**
    ```bash
    git clone https://github.com/your-username/inoskekbn.git
    ```
2.  **Перейдите в директорию проекта:**
    ```bash
    cd sapevari-cuisine
    ```
3.  ** Если используется vs code **

      **С помощью расширения для VS Code,** например, "Live Server".

4.  **Откройте браузер:**
    Перейдите по адресу `http://localhost:8000` .

## Примеры использования

### Выбор блюда

1.  Найдите поле поиска в верхней части страницы.
2.  Введите название блюда, например, "хачапури".
3.  Список блюд автоматически отфильтруется.


### Просмотр галереи блюд

1.  Наведите курсор на карточку с понравившимся блюдом.
2.  Нажмите на значок картинку.
3.  Блюдо будет выбрано и пояавится описание.

** пример кода**
 <article class="menu-category">
                <h3>Десерты</h3>
                <article class="menu-item">
                    <div class="menu-item-content">
                        <h4>Чурчхела</h4>
                        <p>Традиционная грузинская сладость из орехов в виноградном соке</p>
                    </div>
                    <span>280 руб.</span>
                </article>
                <article class="menu-item">
                    <div class="menu-item-content">
                        <h4>Пеламуши</h4>
                        <p>Десерт из виноградного сока и кукурузной муки</p>
                    </div>
                    <span>240 руб.</span>
                </article>
            </article>
        </section>

        <section id="gallery">
            <h2>Галерея</h2>
            <div class="gallery-container">
                <figure class="gallery-item">
                    <img src="/36/img/9d6073efbb5491a2b3817d32e257113b.jpg" alt="Интерьер ресторана">
                    <figcaption>Интерьер нашего ресторана</figcaption>
                </figure>
                <figure class="gallery-item">
                    <img src="/36/img/avxw3yujfg3ck5rkf637klja3iqdo19l-1.jpg" alt="Блюда грузинской кухни">
                    <figcaption>Наши фирменные блюда</figcaption>
                </figure>
                <figure class="gallery-item">
                    <img src="/36/img/8548dc29b8e11eeedeab8b1c625b01ae.jpg" alt="Интерьер зала">
                    <figcaption>Уютная атмосфера</figcaption>
                </figure>
                <figure class="gallery-item">
                    <img src="/36/img/eight.jpg" alt="Грузинские хачапури">
                    <figcaption>Хачапури по-грузински</figcaption>
                </figure>
                <figure class="gallery-item">
                    <img src="/36/img/osobennosti-gruzinskoy-kuhni_0f10a1c692fd9f2ed9ccb4ed11c58e6f.jpg" alt="Приготовление блюд">
                    <figcaption>Наш повар за работой</figcaption>
                </figure>
                <figure class="gallery-item">
                    <img src="/36/img/Пеламуши_150р._1.jpg" alt="Грузинские десерты">
                    <figcaption>Традиционные десерты</figcaption>
                </figure>
                <figure class="gallery-item">
                    <img src="/36/img/XXXL.webp" alt="Грузинские блюда">
                    <figcaption>Наши лучшие блюда</figcaption>
                </figure>
                <figure class="gallery-item">
                    <img src="/36/img/i.webp" alt="Грузинский стол">
                    <figcaption>Праздничный стол</figcaption>
                </figure>
            </div>
        </section>

        <section id="video">
            <h2>Видео о нашем ресторане</h2>
            <div class="video-container">
                <iframe src="/36/img/mixkit-cooking-meat-balls-in-sauce-3806-hd-ready.mp4" title="Видео о ресторане грузинской кухни" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <p>Посмотрите, как мы готовим наши фирменные блюда и ощутите атмосферу настоящей Грузии!</p>
        </section>

        <section id="reservation">
            <h2>Забронировать стол</h2>
            <form>
                <div class="form-group">
                    <label for="name">Ваше имя</label>
                    <input type="text" id="name" name="name" required>
                </div>
                <div class="form-group">
                    <label for="phone">Телефон</label>
                    <input type="tel" id="phone" name="phone" required>
                </div>
                <div class="form-group">
                    <label for="date">Дата</label>
                    <input type="date" id="date" name="date" required>
                </div>
                <div class="form-group">
                    <label for="time">Время</label>
                    <input type="time" id="time" name="time" required>
                </div>
                <div class="form-group">
                    <label for="guests">Количество гостей</label>
                    <input type="number" id="guests" name="guests" min="1" max="20" required>
                </div>
                <div class="form-group">
                    <label for="comments">Особые пожелания</label>
                    <textarea id="comments" name="comments"></textarea>
                </div>
                <button type="submit">Отправить заявку</button>
            </form>
        </section>

        <section id="contacts">
            <h2>Контакты</h2>
            <div class="contact-info">
                <article class="address">
                    <h3>Адрес</h3>
                    <p>г. Москва, ул. Арбат, 25</p>
                </article>
                <article class="hours">
                    <h3>Часы работы</h3>
                    <p>Пн-Чт: 11:00 - 23:00</p>
                    <p>Пт-Сб: 11:00 - 01:00</p>
                    <p>Вс: 11:00 - 23:00</p>
                </article>
                <article class="phone">
                    <h3>Телефон</h3>
                    <p>+7 (495) 123-45-67</p>
                </article>
            </div>
            <div class="map-container">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2245.3729490453885!2d37.59541631604675!3d55.75202300015199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54a45b11de355%3A0x8947e447a3b4c893!2z0JDRgNCx0LvRj9C0!5e0!3m2!1sru!2sru!4v1652103913171!5m2!1sru!2sru" allowfullscreen="" loading="lazy"></iframe>
            </div>
        </section>
    </main>
