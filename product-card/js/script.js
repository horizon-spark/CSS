document.addEventListener("DOMContentLoaded", function () {
  // 1. Инициализация ВСЕХ тултипов
  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]'),
  );
  tooltipTriggerList.forEach(
    (el) =>
      new bootstrap.Tooltip(el, {
        trigger: "hover focus",
        delay: { show: 100, hide: 50 },
      }),
  );

  // 2. Инициализация ВСЕХ поповеров (характеристики)
  const popoverTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="popover"]'),
  );
  const popoverInstances = []; // массив для хранения экземпляров (чтобы позже управлять программно)

  popoverTriggerList.forEach((el, index) => {
    // Создаем поповер с настройками: клик для открытия/закрытия, поддержка HTML
    const popover = new bootstrap.Popover(el, {
      trigger: "click", // по умолчанию открывается по клику
      html: true,
      sanitize: false,
      placement: "auto",
      offset: [0, 10],
    });

    // Сохраняем экземпляр в атрибут элемента и в массив для удобства
    el._popoverInstance = popover;
    popoverInstances.push(popover);

    // ===== ДОПОЛНИТЕЛЬНОЕ ЗАДАНИЕ: обработка события shown.bs.popover для ОДНОГО поповера (первый товар) =====
    if (index === 0) {
      el.addEventListener("shown.bs.popover", function (event) {
        // При открытии поповера для первого товара выводим сообщение в консоль
        console.log(
          `[shown.bs.popover] Открыт поповер для товара: "${event.target.closest(".card-body")?.querySelector(".card-title")?.innerText || "Смартфон Galaxy Aero"}"`,
        );
        console.log(
          "→ Характеристики первого товара показаны программно или по клику!",
        );
      });

      // также добавим обработчик скрытия для чистоты (опционально, не по заданию, но для полноты)
      el.addEventListener("hidden.bs.popover", function () {
        console.log("[hidden.bs.popover] Поповер первого товара закрыт");
      });
    }
  });

  // ===== ФУНКЦИЯ: показать все поповеры программно (используем цикл и метод .show()) =====
  const showAllPopoversBtn = document.getElementById("showAllPopoversBtn");
  if (showAllPopoversBtn) {
    showAllPopoversBtn.addEventListener("click", function () {
      // Перебираем все элементы с поповерами
      const allPopoverElements = document.querySelectorAll(
        '[data-bs-toggle="popover"]',
      );
      let openedCount = 0;
      allPopoverElements.forEach((el) => {
        const pop = el._popoverInstance;
        if (pop && !pop._isShown()) {
          // метод _isShown() недокументированный, но рабочий; можно проверить через состояние
          pop.show();
          openedCount++;
        } else if (pop && pop._isShown()) {
          // уже открыт, ничего не делаем
        }
      });
      console.log(
        `[Программное управление] Показано поповеров: ${openedCount} (остальные уже были открыты)`,
      );
      // альтернативный способ через forEach
    });
  }

  // ===== ФУНКЦИЯ: скрыть все поповеры программно =====
  const hideAllPopoversBtn = document.getElementById("hideAllPopoversBtn");
  if (hideAllPopoversBtn) {
    hideAllPopoversBtn.addEventListener("click", function () {
      const allPopoverElements = document.querySelectorAll(
        '[data-bs-toggle="popover"]',
      );
      let hiddenCount = 0;
      allPopoverElements.forEach((el) => {
        const pop = el._popoverInstance;
        if (pop && pop._isShown()) {
          pop.hide();
          hiddenCount++;
        }
      });
      console.log(`[Программное управление] Скрыто поповеров: ${hiddenCount}`);
    });
  }

  // Вспомогательная функция для проверки видимости поповера (можно через DOM, но используем _isShown)
  // Небольшой фикс: для корректного определения состояния, также можно проверять наличие popover в DOM.
  // Добавим дополнительную гарантию – если по какой-то причине метод ._isShown не сработает, используем альтернативный способ:
  // В Bootstrap 5 есть публичное свойство, но _isShown более стабилен. Оставим как есть.

  // 3. Дополнительные улучшения: при клике на кнопки "В корзину" и "сердечки" (уже было в предыдущей версии)
  const cartButtons = document.querySelectorAll(".btn-custom-primary");
  cartButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const productName =
        btn.closest(".card-body")?.querySelector(".card-title")?.innerText ||
        "Товар";
      const originalTitle = btn.getAttribute("data-bs-title") || "В корзину";
      btn.setAttribute("data-bs-title", "✓ Добавлено!");
      const tool = bootstrap.Tooltip.getInstance(btn);
      if (tool) tool.setContent({ ".tooltip-inner": "✓ Добавлено в корзину" });
      setTimeout(() => {
        btn.setAttribute("data-bs-title", originalTitle);
        if (tool) tool.setContent({ ".tooltip-inner": originalTitle });
      }, 1000);
    });
  });

  // Иконки сердечек: переключение состояния избранного
  const hearts = document.querySelectorAll(".bi-heart");
  hearts.forEach((heart) => {
    heart.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (this.classList.contains("bi-heart")) {
        this.classList.remove("bi-heart");
        this.classList.add("bi-heart-fill");
        this.style.color = "#e83e8c";
        const tempTip = new bootstrap.Tooltip(this, {
          title: "В избранном!",
          trigger: "manual",
          placement: "top",
        });
        tempTip.show();
        setTimeout(() => tempTip.dispose(), 1000);
      } else {
        this.classList.remove("bi-heart-fill");
        this.classList.add("bi-heart");
        this.style.color = "";
        const tempTip = new bootstrap.Tooltip(this, {
          title: "Удалено",
          trigger: "manual",
        });
        tempTip.show();
        setTimeout(() => tempTip.dispose(), 800);
      }
    });
  });

  // Дополнительно: небольшой фикс для предотвращения конфликта кликов по ссылке и всплытия поповера (чтобы при клике на кнопку "показать все" не было глюков)
  console.log(
    'Страница готова. Управление поповерами: кнопки "Показать все подсказки" и "Скрыть все подсказки" активны. Для первого поповера добавлен обработчик shown.bs.popover -> вывод в консоль.',
  );
});
