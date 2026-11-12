import {test} from 'node:test';
import assert from 'node:assert/strict';
import {cartReducer,cartTotals,buildWhatsAppMessage,hydrateCart} from '../src/lib/cart-core';
import {PRODUCTS,formatRupiah} from '../src/lib/products';
const p=PRODUCTS[0];
test('add, update, remove, totals and checkout',()=>{let s={items:[],isLoaded:true} as Parameters<typeof cartReducer>[0];s=cartReducer(s,{type:'ADD',payload:p});s=cartReducer(s,{type:'ADD',payload:p});assert.equal(s.items[0].quantity,2);assert.equal(cartTotals(s.items).subtotal,10000);assert.ok(buildWhatsAppMessage(s.items,formatRupiah).includes(p.name));assert.equal(cartReducer(s,{type:'UPDATE',payload:{slug:p.slug,quantity:0}}).items.length,0);assert.equal(cartReducer(s,{type:'REMOVE',payload:p.slug}).items.length,0);assert.equal(cartReducer(s,{type:'CLEAR'}).items.length,0);});
test('hydrate rejects corrupt data and restores current catalog prices',()=>{assert.deepEqual(hydrateCart('bad'),[]);assert.deepEqual(hydrateCart('{}'),[]);assert.deepEqual(hydrateCart(JSON.stringify([{product:{slug:p.slug,price:1},quantity:2}])),[{product:p,quantity:2}]);});
