import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    lng: 'en',
    resources: {
      en: {
        translation: {
          home: 'Home',
          phones: 'Phones',
          Phones: 'Phones',
          tablets: 'Tablets',
          Tablets: 'Tablets',
          accessories: 'Accessories',
          Accessories: 'Accessories',
          welcomeToNiceGadgetsStore: 'Welcome to Nice Gadgets store!',
          brandNewModels: 'Brand new models',
          shopByCategory: 'Shop by category',
          hotPrices: 'Hot prices',
          mobilePhones: 'Mobile phones',
          models: 'models',
          sortBy: 'Sort by',
          itemsOnPage: 'Items on page',
          screen: 'Screen',
          capacity: 'Capacity',
          RAM: 'RAM',
          addToCart: 'Add to Cart',
          addedToCart: 'Added to Cart',
          github: 'Github',
          contacts: 'Contacts',
          rights: 'Rights',
          backToTop: 'Back to top',
          all: 'All',
          items: 'items',
          yourCartIsEmpty: 'Your cart is empty',
          searchForProduct: 'Search for a product',
          favourites: 'Favourites',
          cart: 'Cart',
          totalFor: 'Total for',
          checkout: 'Checkout',
          wantToConfirmOrder: 'Do you want to confirm the order?',
          no: 'No',
          yes: 'Yes',
          goBack: 'Go back',
          availableColors: 'Available colors',
          selectCapacity: 'Select capacity',
          resolution: 'Resolution',
          processor: 'Processor',
          about: 'About',
          techSpecs: 'Tech specs',
          camera: 'Camera',
          zoom: 'Zoom',
          cell: 'Cell',
          youMayAlsoLike: 'You may also like',
          yourOrderHasBeenPlacedSuccessfuly:
            'Your order has been placed successfully!',
          rightsText:
            'All rights belong to the Kyrylos witnesses team and are protected. Our code is our tool for innovation and building the future. Every line of code is a step forward in our mission to make technology accessible and useful for everyone. ',
        },
      },
      ua: {
        translation: {
          home: 'Головна',
          phones: 'Телефони',
          Phones: 'Телефони',
          tablets: 'Планшети',
          Tablets: 'Планшети',
          accessories: 'Аксесуари',
          Accessories: 'Аксесуари',
          welcomeToNiceGadgetsStore: 'Ласкаво просимо в магазин Nice Gadgets!',
          brandNewModels: 'Нові моделі',
          shopByCategory: 'За категоріями',
          hotPrices: 'Гарячі ціни',
          mobilePhones: 'Мобільні телефони',
          models: 'моделі',
          sortBy: 'Сортувати за',
          itemsOnPage: 'Товарів на сторінці',
          screen: 'Екран',
          capacity: 'Ємність',
          RAM: 'ОЗП',
          addToCart: 'Додати в кошик',
          addedToCart: 'Додано в кошик',
          github: 'Github',
          contacts: 'Контакти',
          rights: 'Права',
          backToTop: 'Вгору',
          all: 'Всі',
          items: 'товар(и)',
          yourCartIsEmpty: 'Ваш кошик порожній',
          searchForProduct: 'Пошук продукту',
          favourites: 'Вибране',
          cart: 'Кошик',
          totalFor: 'Всього за',
          checkout: 'Оформити замовлення',
          wantToConfirmOrder: 'Бажаєте підтвердити замовлення?',
          no: 'Ні',
          yes: 'Так',
          goBack: 'Повернутися',
          availableColors: 'Доступні кольори',
          selectCapacity: 'Виберіть ємність',
          resolution: 'Роздільна здатність',
          processor: 'Процесор',
          about: 'Про товар',
          techSpecs: 'Технічні характеристики',
          camera: 'Камера',
          zoom: 'Збільшення',
          cell: 'Бездротові технології',
          youMayAlsoLike: 'Вам також може сподобатися',
          yourOrderHasBeenPlacedSuccessfuly:
            'Ваше замовлення успішно оформлено!',
          rightsText:
            'Усі права належать команді Kyrylos witnesses і захищені. Наш код - це наш інструмент для інновацій та будівництва майбутнього. Кожен рядок коду - це крок вперед у нашій місії зробити технології доступними і корисними для всіх.',
        },
      },
      vn: {
        translation: {
          home: 'Trang chủ',
          phones: 'Điện thoại',
          Phones: 'Điện thoại',
          tablets: 'Máy tính bảng',
          Tablets: 'Máy tính bảng',
          accessories: 'Phụ kiện',
          Accessories: 'Phụ kiện',
          welcomeToNiceGadgetsStore:
            'Chào mừng đến với cửa hàng tiện ích tuyệt vời!',
          brandNewModels: 'Mẫu mới hoàn toàn',
          shopByCategory: 'Mua theo danh mục',
          hotPrices: 'Giá hot',
          mobilePhones: 'Điện thoại di động',
          models: 'Mẫu',
          sortBy: 'Sắp xếp theo',
          itemsOnPage: 'Số lượng mục trên mỗi trang',
          screen: 'Màn hình',
          capacity: 'Dung lượng',
          RAM: 'Bộ nhớ RAM',
          addToCart: 'Thêm vào giỏ hàng',
          addedToCart: 'Đã thêm vào giỏ hàng',
          github: 'Github',
          contacts: 'Liên hệ',
          rights: 'Bản quyền',
          backToTop: 'Trở về đầu trang',
          all: 'Tất cả',
          items: 'Mục',
          yourCartIsEmpty: 'Giỏ hàng của bạn đang trống',
          searchForProduct: 'Tìm kiếm sản phẩm',
          favourites: 'Yêu thích',
          cart: 'Giỏ hàng',
          totalFor: 'Tổng cộng',
          checkout: 'Thanh toán',
          wantToConfirmOrder: 'Bạn có muốn xác nhận đơn hàng không?',
          no: 'Không',
          yes: 'Có',
          goBack: 'Quay lại',
          availableColors: 'Màu có sẵn',
          selectCapacity: 'Chọn dung lượng',
          resolution: 'Độ phân giải',
          processor: 'Bộ vi xử lý',
          about: 'Về chúng tôi',
          techSpecs: 'Thông số kỹ thuật',
          camera: 'Máy ảnh',
          zoom: 'Thu phóng',
          cell: 'Pin',
          youMayAlsoLike: 'Bạn cũng có thể thích',
          yourOrderHasBeenPlacedSuccessfuly:
            'Đơn hàng của bạn đã được đặt thành công.',
          rightsText:
            'Mọi quyền thuộc về đội ngũ Kyrylos witnesses và được bảo vệ. Mã của chúng tôi là công cụ để đổi mới và xây dựng tương lai. Mỗi dòng mã là một bước nhỏ trong sứ mệnh của chúng tôi để làm cho công nghệ dễ tiếp cận và hữu ích cho mọi người.',
        },
      },
    },
  });
