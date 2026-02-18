import './bootstrap';
window.Echo.channel('orders')
    .listen('.order.created', (e) => {
        console.log('New Order Received:', e);
    });
