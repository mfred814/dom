// Format numbers as Nigerian naira values.
function formatPrice(price) {
	return `₦${price.toLocaleString('en-NG')}`;
}

const cartItems = document.querySelector('#cart-items');
const cartTotal = document.querySelector('#cart-total');
const itemCount = document.querySelector('#item-count');

function updateItem(item) {
	const price = Number(item.dataset.price);
	const quantityElement = item.querySelector('.quantity');
	const quantity = Number(quantityElement.textContent);
	item.querySelector('.item-total').textContent = formatPrice(price * quantity);
}

function updateCartTotal() {
	let total = 0;
	let numberOfItems = 0;
	const items = document.querySelectorAll('.cart-item');

	items.forEach(function (item) {
		const price = Number(item.dataset.price);
		const quantity = Number(item.querySelector('.quantity').textContent);
		total += price * quantity;
		numberOfItems += quantity;
	});

	cartTotal.textContent = formatPrice(total);
	itemCount.textContent = numberOfItems;
}

cartItems.addEventListener('click', function (event) {
	const clickedButton = event.target.closest('button');
	if (!clickedButton) return;

	const item = clickedButton.closest('.cart-item');
	if (!item) return;

	if (clickedButton.classList.contains('increase')) {
		const quantity = item.querySelector('.quantity');
		quantity.textContent = Number(quantity.textContent) + 1;
		updateItem(item);
		updateCartTotal();
	}

	if (clickedButton.classList.contains('decrease')) {
		const quantity = item.querySelector('.quantity');
		const currentQuantity = Number(quantity.textContent);
		if (currentQuantity > 1) {
			quantity.textContent = currentQuantity - 1;
			updateItem(item);
			updateCartTotal();
		}
	}

	if (clickedButton.classList.contains('delete-button')) {
		item.remove();
		if (document.querySelectorAll('.cart-item').length === 0) {
			cartItems.innerHTML = '<p class="empty-message">Your cart is empty.</p>';
		}
		updateCartTotal();
	}

	if (clickedButton.classList.contains('like-button')) {
		const isLiked = clickedButton.classList.toggle('liked');
		clickedButton.textContent = isLiked ? '♥' : '♡';
		clickedButton.setAttribute('aria-pressed', isLiked);
	}
});

updateCartTotal();