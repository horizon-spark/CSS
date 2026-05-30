<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <link rel="stylesheet" href="/src/style.css">
    <title>Document</title>
</head>
<body>
    <header class="bg-white border-b border-gray-200">
        <nav class="max-w-6xl mx-auto px-4 py-4">
            <ul class="flex space-x-6">
                <?php
                function isActiveMenuItem($menu_url) {
                    $current_url = $_SERVER['REQUEST_URI'];
                    
                    $current_path = strtok($current_url, '?');
                    
                    if ($menu_url === '/') {
                        return $current_path === '/' || $current_path === '/index.php';
                    }
                    
                    return $current_path === $menu_url;
                }
                
                $menu_items = [
                    ['name' => 'Главная', 'url' => '/public/'],
                    ['name' => 'Товары', 'url' => '/public/products.php'],
                    ['name' => 'Категории', 'url' => '/public/categories.php'],
                    ['name' => 'Контакты', 'url' => '/public/contacts.php'],
                ];
                ?>
                
                <?php foreach ($menu_items as $item): ?>
                    <?php $is_active = isActiveMenuItem($item['url']); ?>
                    
                    <li>
                        <a 
                            href="<?= $item['url'] ?>" 
                            class="transition-colors <?= $is_active ? 'font-bold text-blue-600' : 'text-gray-700 hover:text-blue-600' ?>"
                            <?= $is_active ? 'aria-current="page"' : '' ?>
                        >
                            <?= htmlspecialchars($item['name']) ?>
                        </a>
                    </li>
                <?php endforeach; ?>
            </ul>
        </nav>
    </header>
