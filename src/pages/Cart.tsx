import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Button } from '../components/ui/Button';
import { Trash2, ShoppingBag, ArrowRight, ShieldCheck, ChevronRight } from 'lucide-react';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useShop();
  
  // Fake GST and Shipping for prototype
  const gst = cartTotal * 0.18;
  const shipping = cartTotal > 0 ? 500 : 0;
  const finalTotal = cartTotal + gst + shipping;

  return (
    <div className="bg-eco-slate-50 min-h-screen pb-24 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h1 className="text-4xl font-heading font-bold text-eco-slate-900 mb-10 flex items-center gap-4 tracking-tight">
          <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-eco-light/60 flex items-center justify-center text-eco-primary shrink-0">
            <ShoppingBag size={24} strokeWidth={2.5} />
          </div>
          Your Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-[2.5rem] p-16 text-center border border-eco-light/60 shadow-sm max-w-3xl mx-auto mt-12">
            <div className="w-28 h-28 bg-eco-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-eco-light/60">
              <ShoppingBag className="text-eco-slate-900/20" size={56} />
            </div>
            <h2 className="text-3xl font-heading font-bold text-eco-slate-900 mb-4 tracking-tight">Your cart is empty</h2>
            <p className="text-eco-slate-900/60 mb-10 max-w-md mx-auto text-lg leading-relaxed">
              Looks like you haven't added any mattresses to your cart yet. Explore our premium collections for better sleep.
            </p>
            <Link to="/shop">
              <Button size="lg" className="gap-2 text-base h-14 px-10 rounded-full shadow-lg shadow-eco-primary/20 hover:-translate-y-1 transition-all duration-300">
                Continue Shopping <ArrowRight size={20} />
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-10">
            
            {/* Cart Items */}
            <div className="flex-grow space-y-6">
              {cart.map((item) => (
                <div key={`${item.id}-${item.size}-${item.thickness}`} className="bg-white rounded-3xl p-4 sm:p-6 border border-eco-light/60 shadow-sm flex flex-col sm:flex-row gap-6 items-start sm:items-center hover:shadow-md hover:border-eco-primary/30 transition-all duration-300">
                  <div className="w-full sm:w-40 aspect-[4/3] rounded-2xl overflow-hidden bg-eco-slate-50 shrink-0 border border-eco-light/60">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex-grow flex flex-col justify-between self-stretch py-2">
                    <div>
                      <h3 className="font-heading font-bold text-xl text-eco-slate-900 mb-2 leading-tight">{item.name}</h3>
                      <div className="text-sm font-medium text-eco-slate-900/60 mb-2">
                        <span className="font-bold text-eco-slate-900/80">Size:</span> {item.size} <span className="mx-2 text-eco-light">•</span> <span className="font-bold text-eco-slate-900/80">Thickness:</span> {item.thickness}
                      </div>
                    </div>
                    <div className="font-heading font-bold text-eco-slate-900 text-xl sm:mt-auto">
                      ₹{item.price.toLocaleString('en-IN')}
                    </div>
                  </div>

                  <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end shrink-0 sm:pr-4">
                    <div className="flex items-center border border-eco-light/60 rounded-full bg-white h-12 p-1 shadow-sm">
                      <button 
                        onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                        className="w-10 h-full rounded-full flex items-center justify-center text-eco-slate-900/60 hover:bg-eco-slate-50 hover:text-eco-slate-900 transition-colors"
                      >
                        -
                      </button>
                      <span className="w-10 text-center font-bold text-eco-slate-900 text-sm">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                        className="w-10 h-full rounded-full flex items-center justify-center text-eco-slate-900/60 hover:bg-eco-slate-50 hover:text-eco-slate-900 transition-colors"
                      >
                        +
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="p-3 text-eco-slate-900/30 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-300"
                      title="Remove item"
                    >
                      <Trash2 size={22} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="w-full lg:w-[26rem] shrink-0">
              <div className="bg-white rounded-[2.5rem] p-8 lg:p-10 border border-eco-light/60 shadow-xl shadow-eco-primary/5 sticky top-28">
                <h3 className="text-2xl font-heading font-bold text-eco-slate-900 mb-8 tracking-tight">Order Summary</h3>
                
                <div className="space-y-5 mb-8 text-[15px]">
                  <div className="flex justify-between text-eco-slate-900/70">
                    <span className="font-medium">Subtotal ({cart.length} items)</span>
                    <span className="font-bold text-eco-slate-900">₹{cartTotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-eco-slate-900/70">
                    <span className="font-medium">Estimated GST (18%)</span>
                    <span className="font-bold text-eco-slate-900">₹{gst.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-eco-slate-900/70">
                    <span className="font-medium">Shipping Charges</span>
                    <span className="font-bold text-eco-slate-900">₹{shipping.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="border-t border-eco-light/50 pt-6 pb-6 mb-2">
                  <label className="text-sm font-bold text-eco-slate-900 block mb-3">Have a coupon code?</label>
                  <div className="flex gap-3">
                    <input type="text" placeholder="Enter code" className="flex-grow px-4 py-3 border border-eco-light/60 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-eco-primary/50 focus:border-eco-primary bg-eco-slate-50" />
                    <Button variant="outline" className="rounded-2xl border-2 px-6">Apply</Button>
                  </div>
                </div>

                <div className="border-t border-eco-light/50 pt-8 mb-10">
                  <div className="flex justify-between items-end mb-1">
                    <span className="font-heading font-bold text-eco-slate-900 text-lg">Total</span>
                    <span className="font-heading font-bold text-3xl text-eco-slate-900">₹{finalTotal.toLocaleString('en-IN')}</span>
                  </div>
                  <p className="text-xs font-semibold text-eco-slate-900/40 text-right uppercase tracking-wider mt-2">Inclusive of all taxes</p>
                </div>

                <Link to="/checkout" className="w-full block">
                  <Button size="lg" className="w-full mb-6 group text-base h-16 rounded-full shadow-lg shadow-eco-primary/20 hover:-translate-y-1 transition-all duration-300">
                    Proceed to Checkout
                    <ChevronRight size={20} className="ml-2 group-hover:translate-x-1.5 transition-transform" />
                  </Button>
                </Link>

                <div className="flex items-center justify-center gap-2.5 text-sm font-semibold text-eco-slate-900/50 mt-8 bg-eco-slate-50 py-3 rounded-2xl border border-eco-light/50">
                  <ShieldCheck size={18} className="text-eco-primary" />
                  <span>Secure Encrypted Checkout</span>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
