// Data menu, promo, dan daftar outlet contoh
const menuItems = [
  { id: 'katsu', category: 'bento', image: 'https://i.pinimg.com/1200x/d0/48/1b/d0481b955a3dc95a05fdd8d4ae2937a4.jpg', emoji: '🍱', name: 'Paket Chicken Katsu', description: 'Ayam katsu renyah, nasi, sayur, dan saus khas.', price: 39000, featured: true },
  { id: 'teriyaki', category: 'bento', image: 'https://i.pinimg.com/1200x/59/26/5d/59265d563dae322d0ff0928fffc95da6.jpg', emoji: '🥩', name: 'Beef Teriyaki Bento', description: 'Daging sapi saus teriyaki manis gurih.', price: 45000 },
  { id: 'ebi', category: 'ala', image: 'https://i.pinimg.com/1200x/18/54/1f/18541f86af133dcfeccfeb5b3891fddb.jpg', emoji: '🍤', name: 'Ebi Furai', description: 'Udang goreng tepung, 5 potong.', price: 32000 },
  { id: 'ramen', category: 'ala', image: 'https://i.pinimg.com/1200x/62/38/08/6238083cdbed4e1243890eb8f4e53867.jpg', emoji: '🍜', name: 'Ramen Shoyu', description: 'Kuah kaldu shoyu dengan mi kenyal.', price: 36000 },
  { id: 'esteh', category: 'minum', image: 'https://i.pinimg.com/736x/fd/0b/34/fd0b347a94a16150a88f9f457969cf34.jpg', emoji: '🧋', name: 'Es Teh Lemon', description: 'Segar, tidak terlalu manis.', price: 12000 },
  { id: 'curry', category: 'bento', image: 'https://i.pinimg.com/1200x/9f/0c/43/9f0c43e9af74ec1cf2abc71d3ed69c48.jpg', emoji: '🍛', name: 'Chicken Curry Rice', description: 'Kari Jepang lembut dengan ayam empuk.', price: 41000, featured: true },
  { id: 'nasi', category: 'ala', image: 'https://i.pinimg.com/736x/6e/ff/db/6effdb4016deb806f3644f22510cad1d.jpg', emoji: '🍚', name: 'Nasi Hangat', description: 'Nasi putih pulen, porsi tambahan.', price: 8000 },
  { id: 'ocha', category: 'minum', image: 'https://i.pinimg.com/736x/8b/46/2f/8b462f867a553fcc9cff7f28437bf030.jpg', emoji: '🍵', name: 'Ocha Dingin', description: 'Teh hijau ala Jepang.', price: 10000 }
];

const marqueeWords = ['Chicken Katsu', 'Beef Teriyaki', 'Ebi Furai', 'Ramen', 'Yakiniku', 'Nasi Hangat'];

const promoCodes = {
  HOKBENBARU: { rate: 0.2, label: 'Diskon 20% pesanan pertama' }
};

const outlets = [
  { name: 'HokBen Contoh Malang Kota', city: 'Malang', address: 'Jl. Contoh No. 1, Klojen', hours: '10.00–22.00' },
  { name: 'HokBen Contoh Lowokwaru', city: 'Malang', address: 'Jl. Contoh No. 2, Lowokwaru', hours: '10.00–22.00' },
  { name: 'HokBen Contoh Surabaya Timur', city: 'Surabaya', address: 'Jl. Contoh No. 3, Gubeng', hours: '10.00–22.00' },
  { name: 'HokBen Contoh Bandung Dago', city: 'Bandung', address: 'Jl. Contoh No. 4, Coblong', hours: '10.00–21.00' },
  { name: 'HokBen Contoh Jakarta Selatan', city: 'Jakarta', address: 'Jl. Contoh No. 5, Kebayoran Baru', hours: '10.00–22.00' }
];

// Ambil elemen halaman
const menuGrid = document.getElementById('menu-grid');
const tabButtons = document.querySelectorAll('.tab-btn');
const cartButton = document.getElementById('cart-button');
const cartCount = document.getElementById('cart-count');
const cartList = document.getElementById('cart-list');
const cartEmpty = document.getElementById('cart-empty');
const cartFoot = document.getElementById('cart-foot');
const drawer = document.getElementById('drawer');
const overlay = document.getElementById('overlay');
const voucherForm = document.getElementById('voucher-form');
const voucherInput = document.getElementById('voucher-input');
const voucherMsg = document.getElementById('voucher-message');
const toastEl = document.getElementById('toast');

let cart = {}; // contoh isi: { katsu: 2, esteh: 1 }
let activePromo = null;
let toastTimer;

function formatRupiah(angka) {
  return 'Rp' + angka.toLocaleString('id-ID');
}

function showToast(pesan) {
  toastEl.textContent = pesan;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () {
    toastEl.classList.remove('show');
  }, 2200);
}

function replayAnim(el, namaClass) {
  el.classList.remove(namaClass);
  void el.offsetWidth;
  el.classList.add(namaClass);
}

// Render kartu menu
function renderMenu() {
  menuGrid.innerHTML = '';

  menuItems.forEach(function (item) {
    const card = document.createElement('article');
    card.className = 'menu-card';
    card.dataset.category = item.category;
    if (item.featured) {
      card.classList.add('menu-featured');
    }

    const media = document.createElement('div');
    media.className = 'menu-media';

    const img = document.createElement('img');
    img.className = 'menu-img';
    img.src = item.image;
    img.alt = item.name;
    img.loading = 'lazy';
    img.onerror = function () {
      media.innerHTML = '<span class="menu-emoji">' + item.emoji + '</span>';
    };
    media.appendChild(img);

    const nama = document.createElement('h3');
    nama.className = 'menu-name';
    nama.textContent = item.name;

    const desc = document.createElement('p');
    desc.className = 'menu-desc';
    desc.textContent = item.description;

    const footer = document.createElement('div');
    footer.className = 'menu-footer';

    const harga = document.createElement('span');
    harga.className = 'menu-price';
    harga.textContent = formatRupiah(item.price);

    const tombolTambah = document.createElement('button');
    tombolTambah.className = 'menu-add';
    tombolTambah.type = 'button';
    tombolTambah.textContent = '+';
    tombolTambah.addEventListener('click', function () {
      addToCart(item.id);
    });

    footer.appendChild(harga);
    footer.appendChild(tombolTambah);

    card.appendChild(media);
    card.appendChild(nama);
    card.appendChild(desc);
    card.appendChild(footer);

    menuGrid.appendChild(card);
  });
}

// Filter menu berdasarkan tab kategori
function initTabs() {
  tabButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      tabButtons.forEach(function (b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');

      const kategori = btn.dataset.filter;
      const cards = menuGrid.querySelectorAll('.menu-card');

      cards.forEach(function (card) {
        const cocok = kategori === 'all' || card.dataset.category === kategori;
        card.hidden = !cocok;
        if (cocok) {
          replayAnim(card, 'menu-entering');
        }
      });
    });
  });
}

// Logika keranjang dan promo
function cariItem(id) {
  return menuItems.find(function (item) {
    return item.id === id;
  });
}

function hitungTotal() {
  let subtotal = 0;
  for (const id in cart) {
    const item = cariItem(id);
    if (item) {
      subtotal += item.price * cart[id];
    }
  }
  const diskon = activePromo ? Math.round(subtotal * activePromo.rate) : 0;
  return { subtotal: subtotal, diskon: diskon, total: subtotal - diskon };
}

function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  renderCart();
  replayAnim(cartButton, 'cart-bump');
  showToast(cariItem(id).name + ' masuk keranjang');
}

function ubahJumlah(id, selisih) {
  const jumlahBaru = (cart[id] || 0) + selisih;
  if (jumlahBaru <= 0) {
    delete cart[id];
  } else {
    cart[id] = jumlahBaru;
  }
  renderCart();
}

function renderCart() {
  cartList.innerHTML = '';
  let totalItem = 0;

  for (const id in cart) {
    const qty = cart[id];
    const item = cariItem(id);
    totalItem += qty;

    const li = document.createElement('li');
    li.className = 'cart-item';
    li.innerHTML =
      '<span class="cart-item-emoji">' + item.emoji + '</span>' +
      '<div>' +
        '<div class="cart-item-name">' + item.name + '</div>' +
        '<div class="cart-item-price">' + formatRupiah(item.price * qty) + '</div>' +
      '</div>' +
      '<div class="qty">' +
        '<button class="qty-btn minus" type="button">−</button>' +
        '<span class="qty-value">' + qty + '</span>' +
        '<button class="qty-btn plus" type="button">+</button>' +
      '</div>';

    li.querySelector('.minus').addEventListener('click', function () {
      ubahJumlah(id, -1);
    });
    li.querySelector('.plus').addEventListener('click', function () {
      ubahJumlah(id, 1);
    });

    cartList.appendChild(li);
  }

  cartCount.textContent = totalItem;
  cartEmpty.hidden = totalItem > 0;
  cartFoot.hidden = totalItem === 0;

  const ringkasan = hitungTotal();
  document.getElementById('sum-subtotal').textContent = formatRupiah(ringkasan.subtotal);
  document.getElementById('sum-discount').textContent = '-' + formatRupiah(ringkasan.diskon);
  document.getElementById('sum-discount-row').hidden = !activePromo;
  document.getElementById('sum-total').textContent = formatRupiah(ringkasan.total);
}

function pakaiPromo(kodeMentah) {
  const kode = kodeMentah.trim().toUpperCase();
  const promo = promoCodes[kode];

  if (!promo) {
    voucherMsg.textContent = kode ? 'Kode tidak ditemukan. Periksa lagi penulisannya.' : 'Masukkan kode promo dulu.';
    voucherMsg.className = 'voucher-msg voucher-error';
    return;
  }

  activePromo = { kode: kode, rate: promo.rate, label: promo.label };
  voucherInput.value = kode;
  voucherMsg.textContent = promo.label + ' dipakai.';
  voucherMsg.className = 'voucher-msg voucher-ok';
  renderCart();
}

function bukaDrawer() {
  overlay.hidden = false;
  drawer.classList.add('open');
}

function tutupDrawer() {
  overlay.hidden = true;
  drawer.classList.remove('open');
}

function initCart() {
  cartButton.addEventListener('click', bukaDrawer);
  document.getElementById('drawer-close').addEventListener('click', tutupDrawer);
  overlay.addEventListener('click', tutupDrawer);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      tutupDrawer();
    }
  });

  voucherForm.addEventListener('submit', function (e) {
    e.preventDefault();
    pakaiPromo(voucherInput.value);
  });

  document.getElementById('checkout').addEventListener('click', function () {
    showToast('Total ' + formatRupiah(hitungTotal().total) + '. Ini prototipe, pembayaran belum tersedia.');
  });

  document.getElementById('coupon-code').addEventListener('click', function () {
    navigator.clipboard.writeText('HOKBENBARU').then(function () {
      showToast('Kode HOKBENBARU disalin');
    }).catch(function () {
      showToast('Salin manual kode: HOKBENBARU');
    });
  });

  document.getElementById('promo-apply').addEventListener('click', function () {
    pakaiPromo('HOKBENBARU');
    bukaDrawer();
  });

  renderCart();
}

// Pencarian outlet
function initOutletSearch() {
  const form = document.getElementById('outlet-form');
  const input = document.getElementById('outlet-query');
  const hasilEl = document.getElementById('outlet-results');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const kataKunci = input.value.trim().toLowerCase();

    const cocok = kataKunci
      ? outlets.filter(function (o) {
          return (o.name + ' ' + o.city + ' ' + o.address).toLowerCase().includes(kataKunci);
        })
      : outlets;

    hasilEl.innerHTML = '';

    if (cocok.length === 0) {
      hasilEl.innerHTML = '<li class="outlet-card outlet-empty">Belum ada outlet contoh di "' + input.value.trim() + '". Coba Malang, Surabaya, Bandung, atau Jakarta.</li>';
      return;
    }

    cocok.forEach(function (o) {
      const li = document.createElement('li');
      li.className = 'outlet-card';
      li.innerHTML = '<h3>' + o.name + '</h3><p>' + o.address + '</p><p>Buka ' + o.hours + '</p>';
      hasilEl.appendChild(li);
    });
  });
}

// Marquee dan animasi scroll
function initMarquee() {
  const track = document.getElementById('marquee-track');
  const semuaKata = marqueeWords.concat(marqueeWords);
  track.innerHTML = semuaKata.map(function (kata) {
    return '<span>' + kata + '</span>';
  }).join('');
}

function initScrollReveal() {
  const elemen = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  elemen.forEach(function (el) {
    observer.observe(el);
  });
}

// Jalankan semua fungsi saat halaman siap
renderMenu();
initTabs();
initCart();
initOutletSearch();
initMarquee();
initScrollReveal();