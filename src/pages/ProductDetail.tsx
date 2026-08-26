import { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Button } from '../components/ui/Button';
import { 
  ChevronRight, 
  Star, 
  CheckCircle2, 
  Truck, 
  ShieldCheck, 
  Ruler, 
  ShoppingCart,
  ArrowLeft,
  Heart,
  GitCompare
} from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, wishlist, toggleWishlist, products } = useShop();
  const product = products.find(p => p.id === id);

  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [selectedThicknessIndex, setSelectedThicknessIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-eco-slate-50">
        <h2 className="text-2xl font-heading font-bold mb-4 text-eco-slate-900">Product not found</h2>
        <Link to="/shop" className="text-eco-primary hover:underline font-medium">Return to Shop</Link>
      </div>
    );
  }

  const currentSize = product.sizes?.[selectedSizeIndex] || { size: 'Default', thicknesses: [{ t: 'Default', price: product.basePrice }] };
  const currentThickness = currentSize.thicknesses?.[selectedThicknessIndex] || currentSize.thicknesses?.[0] || { t: 'Default', price: product.basePrice };
  const price = currentThickness.price || product.basePrice;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: price,
      quantity: quantity,
      size: currentSize.size,
      thickness: currentThickness.t,
      image: product.image
    });
    // navigate('/cart'); // Optional: redirect to cart immediately
  };

  return (
    <div className="bg-eco-slate-50 min-h-screen pb-24 mt-20">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-eco-light/50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-sm text-eco-slate-900/60 font-medium">
          <Link to="/" className="hover:text-eco-primary transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link to="/shop" className="hover:text-eco-primary transition-colors">Shop</Link>
          <ChevronRight size={14} />
          <span className="text-eco-slate-900 font-bold truncate">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-sm font-bold text-eco-slate-900/60 hover:text-eco-primary mb-6 transition-colors">
          <ArrowLeft size={16} /> Back to Products
        </button>

        <div className="bg-white rounded-[2.5rem] p-6 lg:p-12 shadow-xl shadow-eco-primary/5 border border-eco-light/50">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Image Gallery */}
            <div className="space-y-6">
              <div className="aspect-[4/3] rounded-[2rem] overflow-hidden bg-eco-slate-50 border border-eco-light/60">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div className="aspect-square rounded-2xl overflow-hidden border-2 border-eco-primary bg-eco-slate-50">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                {/* Placeholders for additional images */}
                <div className="aspect-square rounded-2xl overflow-hidden border border-eco-light/60 bg-eco-slate-50/50"></div>
                <div className="aspect-square rounded-2xl overflow-hidden border border-eco-light/60 bg-eco-slate-50/50"></div>
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-eco-light/50 text-eco-primary text-[10px] font-bold uppercase tracking-widest mb-6 self-start">
                {product.type}
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-heading font-bold text-eco-slate-900 mb-4 tracking-tight leading-tight">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center text-yellow-400">
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" className="text-yellow-200" />
                </div>
                <span className="text-sm font-semibold text-eco-slate-900/50">({product.reviews || '42'} reviews)</span>
              </div>

              <p className="text-lg text-eco-slate-900/60 mb-8 leading-relaxed">
                {product.description}
              </p>

              <div className="text-4xl font-heading font-bold text-eco-slate-900 mb-8">
                ₹{price.toLocaleString('en-IN')}
                <span className="text-sm font-medium text-eco-slate-900/50 ml-3 uppercase tracking-wider block sm:inline mt-1 sm:mt-0">incl. of all taxes</span>
              </div>

              <hr className="border-eco-light/60 mb-8" />

              {/* Selectors */}
              <div className="space-y-8 mb-10">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="font-heading font-bold text-eco-slate-900 flex items-center gap-2 text-lg">
                      <Ruler size={20} className="text-eco-primary" /> Size <span className="text-sm font-normal text-eco-slate-900/50">(Inches)</span>
                    </label>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {product.sizes?.map((s: any, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedSizeIndex(idx);
                          setSelectedThicknessIndex(0);
                        }}
                        className={`py-3.5 px-4 rounded-2xl border text-sm font-bold transition-all duration-300 ${
                          selectedSizeIndex === idx 
                            ? 'border-eco-primary bg-eco-primary text-white shadow-md shadow-eco-primary/20 scale-[1.02]' 
                            : 'border-eco-light/60 bg-white text-eco-slate-900/70 hover:border-eco-primary/50 hover:text-eco-slate-900'
                        }`}
                      >
                        {s.size}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="font-heading font-bold text-eco-slate-900 block mb-4 text-lg">Thickness / Variant</label>
                  <div className="grid grid-cols-2 gap-3">
                    {currentSize.thicknesses?.map((t: any, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedThicknessIndex(idx)}
                        className={`py-3.5 px-4 rounded-2xl border text-sm font-bold transition-all duration-300 ${
                          selectedThicknessIndex === idx 
                            ? 'border-eco-primary bg-eco-primary text-white shadow-md shadow-eco-primary/20 scale-[1.02]' 
                            : 'border-eco-light/60 bg-white text-eco-slate-900/70 hover:border-eco-primary/50 hover:text-eco-slate-900'
                        }`}
                      >
                        {t.t}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="font-heading font-bold text-eco-slate-900 block mb-4 text-lg">Quantity</label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-eco-light/60 rounded-full bg-white h-14 p-1 shadow-sm">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-12 h-full rounded-full flex items-center justify-center text-eco-slate-900/60 hover:bg-eco-slate-50 hover:text-eco-slate-900 transition-colors"
                      >
                        -
                      </button>
                      <span className="w-12 text-center font-bold text-eco-slate-900 text-lg">{quantity}</span>
                      <button 
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-12 h-full rounded-full flex items-center justify-center text-eco-slate-900/60 hover:bg-eco-slate-50 hover:text-eco-slate-900 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mt-auto mb-6">
                <Button size="lg" className="flex-1 gap-2 text-base h-14 rounded-full" onClick={handleAddToCart}>
                  <ShoppingCart size={22} />
                  Add to Cart
                </Button>
                <Button size="lg" variant="outline" className="flex-1 text-base h-14 rounded-full border-2" onClick={() => { handleAddToCart(); navigate('/checkout'); }}>
                  Buy Now
                </Button>
              </div>

              <div className="flex items-center gap-8">
                <button 
                  onClick={() => toggleWishlist(product.id)}
                  className={`flex items-center gap-2 text-sm font-bold transition-colors ${wishlist.includes(product.id) ? 'text-red-500' : 'text-eco-slate-900/60 hover:text-eco-primary'}`}
                >
                  <Heart size={18} fill={wishlist.includes(product.id) ? "currentColor" : "none"} className="transition-transform hover:scale-110" />
                  {wishlist.includes(product.id) ? 'Saved to Wishlist' : 'Add to Wishlist'}
                </button>
                <button className="flex items-center gap-2 text-sm font-bold text-eco-slate-900/60 hover:text-eco-primary transition-colors">
                  <GitCompare size={18} />
                  Compare
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-6 mt-10 pt-10 border-t border-eco-light/50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-eco-light/40 text-eco-primary flex items-center justify-center shrink-0">
                    <ShieldCheck size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="font-heading font-bold text-eco-slate-900 text-sm mb-0.5">Quality Tested</div>
                    <div className="text-[11px] uppercase tracking-wider font-semibold text-eco-slate-900/50">Premium materials</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-eco-light/40 text-eco-primary flex items-center justify-center shrink-0">
                    <Truck size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="font-heading font-bold text-eco-slate-900 text-sm mb-0.5">Fast Delivery</div>
                    <div className="text-[11px] uppercase tracking-wider font-semibold text-eco-slate-900/50">Pan India Delivery</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Features & Details Section */}
        <div className="mt-12 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-sm border border-eco-light/50">
              <h2 className="text-3xl font-heading font-bold text-eco-slate-900 mb-8">Product Features</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {product.features?.map((feature: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-eco-light/50 text-eco-primary flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 size={16} strokeWidth={3} />
                    </div>
                    <span className="font-medium text-eco-slate-900/70 leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-eco-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-xl shadow-eco-primary/10">
              <div className="absolute top-0 right-0 w-48 h-48 bg-eco-primary/20 rounded-bl-[100%] opacity-50 pointer-events-none"></div>
              <h3 className="text-2xl font-heading font-bold mb-4 relative z-10">Need Bulk Quantity?</h3>
              <p className="text-eco-light/80 mb-8 text-sm relative z-10 leading-relaxed">
                We are a trusted manufacturer for hotels, hospitals, and institutional buyers. Get special factory-direct pricing for bulk orders.
              </p>
              <a href="tel:+917518233001" className="inline-flex items-center justify-center w-full px-6 py-4 rounded-full bg-white text-eco-slate-900 font-bold hover:bg-eco-light hover:-translate-y-1 transition-all duration-300 relative z-10 shadow-lg">
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
