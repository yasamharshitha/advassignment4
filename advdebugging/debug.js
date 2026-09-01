
//bug1
function createSessionCounter() {
    let globalCount = 0;
    return function() {
        globalCount += 1;
        return `Session hits: ${globalCount}`;
    };
}

const sessionA = createSessionCounter();
const sessionB = createSessionCounter();

console.log(sessionA()); // "Session hits: 1"
console.log(sessionB()); // "Session hits: 2" ❌ Expected sessionB to start at 1!
console.log(sessionA());


//bug2
const dbCart = [
    { id: 1, name: "Laptop", price: 50000 },
    { id: 2, name: "Mouse", price: 1500 }
];

function applyStoreDiscount(cart, discountRate) {
    return cart.map(item => ({
        ...item,
        price: item.price * (1 - discountRate)
    }));
}

const discountedCart = applyStoreDiscount(dbCart, 0.10);

console.log(discountedCart);

console.log(dbCart[0].price);       // 50000 ✅ Original unchanged
console.log(dbCart[1].price); // 45000 ✅ Discounted copy


//bug3 
const buildUrl = (domain) => (route) => (id) =>
    `https://${domain}/${route}/${id}`;

// A developer tries to pass two arguments in the first call:
const fetchUser = buildUrl("api.github.com") ("users"); // ❌ Throws TypeError when called next!

console.log(fetchUser(42));



//bug4

const pipe = (...fns) => (val) =>
    fns.reduce((acc, fn) => fn(acc), val);

const addShipping = (price) => price + 50;

const applyTax = (price) => price * 1.18;

const formatCurrency = (price) =>
    `₹${price.toFixed(2)}`;

const calculateTotal = pipe(
    addShipping,
    applyTax,
    formatCurrency
);

console.log(calculateTotal(500));