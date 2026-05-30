<?php 
  $products = [
    [
      'name' => 'Игровое кресло', 
      'price' => 15000, 
      'category' => 'Мебель', 
      'in_stock' => true
    ],
    [
      'name' => 'Оперативная память', 
      'price' => 20000, 
      'category' => 'Электроника', 
      'in_stock' => false
    ],
    [
      'name' => 'МФУ', 
      'price' => 40000, 
      'category' => 'Электроника', 
      'in_stock' => true
    ],
  ];

  function getClassByCategory($category) {
    switch ($category) 
    {
      case "Электроника":
        return "text-sm text-purple-500 mb-3";
      case "Мебель":
        return "text-sm text-orange-500 mb-3";
      default:
        return "text-sm text-gray-500 mb-3";
    }
  }

  $view = $_GET['view'] ?? 'grid';
  
  if ($view === 'list') {
    $container_class = "flex flex-col gap-4";
    $card_class = "flex items-center justify-between";
    $price_class = "text-right";
  } else {
    $container_class = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4";
    $card_class = "";
    $price_class = "mb-3";
  }
?>

<?php include "../templates/header.php"; ?>

<div class="max-w-6xl mx-auto px-4 py-8">
  <div class="mb-6 flex justify-end space-x-1">
    <a href="?view=grid" 
       class="px-3 py-1 text-sm transition-colors <?= $view === 'grid' ? 'text-gray-900 font-medium' : 'text-gray-400 hover:text-gray-600' ?>">
      Сетка
    </a>
    <span class="text-gray-300">/</span>
    <a href="?view=list" 
       class="px-3 py-1 text-sm transition-colors <?= $view === 'list' ? 'text-gray-900 font-medium' : 'text-gray-400 hover:text-gray-600' ?>">
      Список
    </a>
  </div>

  <div class="<?= $container_class ?>">
    <?php foreach ($products as $product): ?>
      <div class="border-b border-gray-100 py-4 <?= $card_class ?> hover:border-gray-300 transition-colors">
        <div class="flex-1">
          <div class="<?= $view === 'list' ? 'flex items-center justify-between' : '' ?>">
            <div>
              <h3 class="text-gray-900 <?= $view === 'list' ? 'text-base' : 'text-lg font-medium' ?>">
                <?= htmlspecialchars($product['name']) ?>
              </h3>
              <p class="<?= getClassByCategory($product['category']) ?>">
                <?= htmlspecialchars($product['category']) ?>
              </p>
            </div>
            
            <p class="text-gray-700 font-mono <?= $price_class ?> <?= $view === 'list' ? 'text-base' : 'text-lg font-semibold mt-2' ?>">
              <?= number_format($product['price'], 0, '', ' ') ?> ₽
            </p>
          </div>
          
          <div class="<?= $view === 'list' ? 'flex items-center justify-between mt-3' : 'mt-3' ?>">
            <p class="text-xs <?= $product['in_stock'] ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100' ?>">
              <?= $product['in_stock'] ? 'в наличии' : 'нет в наличии' ?>
            </p>
            
            <button class="text-sm <?= $view === 'list' ? 'px-3 py-1' : 'w-full py-1.5 mt-2' ?> border border-gray-200 hover:border-gray-400 transition-colors <?= !$product['in_stock'] ? 'opacity-30' : '' ?>">
              <?= $product['in_stock'] ? 'купить' : 'ожидается' ?>
            </button>
          </div>
        </div>
      </div>
    <?php endforeach; ?>
  </div>
</div>

<?php include "../templates/footer.php"; ?>