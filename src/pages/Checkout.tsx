import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Button } from '../components/ui/Button';
import { ShoppingBag, ArrowLeft, CheckCircle2, ShieldCheck, ChevronLeft, QrCode } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import QRCode from 'react-qr-code';

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useShop();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cod'>('upi');
  const [orderId, setOrderId] = useState('');
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    utr: ''
  });

  const gst = cartTotal * 0.18;
  const shipping = cartTotal > 0 ? 500 : 0;
  const finalTotal = cartTotal + gst + shipping;

  const upiLink = `upi://pay?pa=7518233001@ybl&pn=Foam%20Crafts%20India&am=${finalTotal}&cu=INR`;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = async (e: SubmitEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      if (paymentMethod === 'upi' && !formData.utr) {
        alert("Please enter the UTR / Reference Number after completing UPI payment.");
        return;
      }
      await processOrder(e);
    }
  };

  const processOrder = async (e: SubmitEvent) => {
    setIsProcessing(true);
    try {
      const generatedOrderId = `ORD-${Math.floor(Math.random() * 1000000)}`;
      setOrderId(generatedOrderId);

      const orderData = {
        orderId: generatedOrderId,
        customerDetails: formData,
        products: cart,
        subtotal: cartTotal,
        gst,
        shipping,
        total: finalTotal,
        paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? 'Pending' : 'Verify',
        orderStatus: 'Confirmed',
        createdAt: serverTimestamp()
      };

      // 1. Save to Firebase
      await addDoc(collection(db, 'orders'), orderData);

      // 2. Call Notification API (EmailJS)
      try {
        const templateParams = {
          order_id: generatedOrderId,
          customer_name: `${formData.firstName} ${formData.lastName}`,
          phone_number: formData.phone,
          customer_email: formData.email,
          delivery_address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
          ordered_products: cart.map(item => `${item.name} (${item.size}) - Qty: ${item.quantity}`).join('\n'),
          total_amount: `₹${finalTotal.toLocaleString('en-IN')}`,
          payment_method: paymentMethod.toUpperCase(),
          order_status: paymentMethod === 'cod' ? 'Pending' : 'Verify',
          date_time: new Date().toLocaleString('en-IN')
        };

        const reciept = new FormData();
        Object.entries(templateParams).forEach(([key, value]) => {
          reciept.append(key, value);
        });
        reciept.append("access_key","6324162c-3cb0-42a4-8a80-f107cc40ae0c");
                
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: reciept
        });

      await response.json();
        
        // const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        // const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        // const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        // if (serviceId && templateId && publicKey) {

        // await emailjs.send(serviceId, templateId, templateParams, publicKey);
        // } else {
        //   console.warn('EmailJS environment variables are missing. Emails not sent.');
        // }
      } catch (err) {
        console.error('EmailJS error:', err);
      }

      // 3. Complete
      clearCart();
      setStep(3);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('There was an error processing your order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.length === 0 && step !== 3) {
    return (
      <div className="bg-eco-slate-50 min-h-screen pt-24 pb-24 text-center flex flex-col items-center justify-center">
        <h2 className="text-3xl font-heading font-bold mb-4 text-eco-slate-900">Your cart is empty</h2>
        <Link to="/shop">
          <Button className="rounded-full shadow-lg shadow-eco-primary/20">Return to Shop</Button>
        </Link>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="bg-eco-slate-50 min-h-screen pt-24 pb-24 flex items-center justify-center px-4">
        <div className="bg-white rounded-[2.5rem] p-10 md:p-14 border border-eco-light/60 shadow-xl shadow-eco-primary/5 max-w-lg w-full text-center">
          <div className="w-24 h-24 bg-eco-primary/10 text-eco-primary rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-4xl font-heading font-bold text-eco-slate-900 mb-4 tracking-tight">Order Confirmed!</h2>
          <p className="text-eco-slate-900/70 mb-8 leading-relaxed text-lg">
            Thank you for choosing Foam Crafts India. Your order #{orderId} has been successfully placed. We'll send you an email confirmation shortly.
          </p>
          <div className="bg-eco-slate-50 border border-eco-light/50 rounded-3xl p-8 text-left mb-10">
            <p className="font-bold text-eco-slate-900 mb-3 text-lg">What's next?</p>
            <p className="text-sm font-medium text-eco-slate-900/70 leading-relaxed">Your mattress will be manufactured and dispatched within 3-5 business days. You'll receive a tracking link via WhatsApp/Email once dispatched.</p>
          </div>
          <Link to="/">
            <Button size="lg" className="w-full rounded-full shadow-lg shadow-eco-primary/20 h-16 text-base">Return to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-eco-slate-50 min-h-screen pb-24 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={() => navigate('/cart')} className="inline-flex items-center gap-2 text-sm font-medium text-eco-slate-900/60 hover:text-eco-primary mb-6 transition-colors">
          <ChevronLeft size={16} /> Return to Cart
        </button>
        <h1 className="text-4xl font-heading font-bold text-eco-slate-900 mb-10 tracking-tight">Checkout</h1>
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Main Form Area */}
          <div className="flex-grow space-y-8">
            <div className="flex items-center justify-between mb-8 px-4 sm:px-12">
              <div className={`flex flex-col items-center ${step >= 1 ? 'text-eco-primary' : 'text-eco-slate-900/40'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition-colors duration-500 ${step >= 1 ? 'bg-eco-primary text-white shadow-md shadow-eco-primary/20' : 'bg-eco-light/50'}`}>1</div>
                <span className="text-xs font-bold uppercase tracking-wider">Shipping</span>
              </div>
              <div className={`flex-grow h-1 mx-4 rounded-full transition-colors duration-500 ${step >= 2 ? 'bg-eco-primary' : 'bg-eco-light/50'}`}></div>
              <div className={`flex flex-col items-center ${step >= 2 ? 'text-eco-primary' : 'text-eco-slate-900/40'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition-colors duration-500 ${step >= 2 ? 'bg-eco-primary text-white shadow-md shadow-eco-primary/20' : 'bg-eco-light/50'}`}>2</div>
                <span className="text-xs font-bold uppercase tracking-wider">Payment</span>
              </div>
            </div>

            <form id="checkout-form" onSubmit={(e)=>handleNext(e as any)}>
              {step === 1 && (
                <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-eco-light/60 shadow-xl shadow-eco-primary/5">
                  <h3 className="text-2xl font-heading font-bold text-eco-slate-900 mb-8 tracking-tight">Shipping Information</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-eco-slate-900">First Name</label>
                      <input required name="firstName" value={formData.firstName} onChange={handleInputChange} type="text" className="w-full px-4 py-3.5 rounded-2xl border border-eco-light/60 focus:outline-none focus:ring-2 focus:ring-eco-primary/50 focus:border-eco-primary bg-eco-slate-50 transition-all" placeholder="Enter first name" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-eco-slate-900">Last Name</label>
                      <input required name="lastName" value={formData.lastName} onChange={handleInputChange} type="text" className="w-full px-4 py-3.5 rounded-2xl border border-eco-light/60 focus:outline-none focus:ring-2 focus:ring-eco-primary/50 focus:border-eco-primary bg-eco-slate-50 transition-all" placeholder="Enter last name" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-bold text-eco-slate-900">Email Address</label>
                      <input required name="email" value={formData.email} onChange={handleInputChange} type="email" className="w-full px-4 py-3.5 rounded-2xl border border-eco-light/60 focus:outline-none focus:ring-2 focus:ring-eco-primary/50 focus:border-eco-primary bg-eco-slate-50 transition-all" placeholder="For order updates" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-bold text-eco-slate-900">Phone Number <span className="text-eco-slate-900/50 font-medium">(WhatsApp preferred)</span></label>
                      <input required name="phone" value={formData.phone} onChange={handleInputChange} type="tel" className="w-full px-4 py-3.5 rounded-2xl border border-eco-light/60 focus:outline-none focus:ring-2 focus:ring-eco-primary/50 focus:border-eco-primary bg-eco-slate-50 transition-all" placeholder="+91" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-bold text-eco-slate-900">Full Delivery Address</label>
                      <textarea required name="address" value={formData.address} onChange={handleInputChange} rows={3} className="w-full px-4 py-3.5 rounded-2xl border border-eco-light/60 focus:outline-none focus:ring-2 focus:ring-eco-primary/50 focus:border-eco-primary bg-eco-slate-50 transition-all" placeholder="Street address, apartment, suite, unit, etc."></textarea>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-eco-slate-900">City</label>
                      <input required name="city" value={formData.city} onChange={handleInputChange} type="text" className="w-full px-4 py-3.5 rounded-2xl border border-eco-light/60 focus:outline-none focus:ring-2 focus:ring-eco-primary/50 focus:border-eco-primary bg-eco-slate-50 transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-eco-slate-900">State</label>
                      <input required name="state" value={formData.state} onChange={handleInputChange} type="text" className="w-full px-4 py-3.5 rounded-2xl border border-eco-light/60 focus:outline-none focus:ring-2 focus:ring-eco-primary/50 focus:border-eco-primary bg-eco-slate-50 transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-eco-slate-900">PIN Code</label>
                      <input required name="pincode" value={formData.pincode} onChange={handleInputChange} type="text" className="w-full px-4 py-3.5 rounded-2xl border border-eco-light/60 focus:outline-none focus:ring-2 focus:ring-eco-primary/50 focus:border-eco-primary bg-eco-slate-50 transition-all" />
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-eco-light/60 shadow-xl shadow-eco-primary/5 animate-in fade-in slide-in-from-right-4 duration-500">
                  <h3 className="text-2xl font-heading font-bold text-eco-slate-900 mb-8 tracking-tight">Payment Method</h3>
                  <div className="space-y-4">
                    <label className={`flex items-center justify-between p-5 border-2 rounded-2xl cursor-pointer transition-all ${paymentMethod === 'upi' ? 'border-eco-primary bg-eco-primary/5' : 'border-eco-light/60 hover:border-eco-primary/30'}`}>
                      <div className="flex items-center gap-4">
                        <input type="radio" name="payment" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} className="w-5 h-5 text-eco-primary focus:ring-eco-primary" />
                        <span className="font-bold text-eco-slate-900">Online Payment (UPI/GPay/PhonePe)</span>
                      </div>
                      <QrCode className="text-eco-primary" size={24} />
                    </label>
                    
                    <label className={`flex items-center justify-between p-5 border-2 rounded-2xl cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-eco-primary bg-eco-primary/5' : 'border-eco-light/60 hover:border-eco-primary/30'}`}>
                      <div className="flex items-center gap-4">
                        <input type="radio" name="payment" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="w-5 h-5 text-eco-primary focus:ring-eco-primary" />
                        <span className="font-bold text-eco-slate-900/70">Cash on Delivery</span>
                      </div>
                    </label>
                  </div>

                  {paymentMethod === 'upi' && (
                    <div className="mt-8 p-6 bg-eco-slate-50 rounded-2xl border border-eco-light/50 flex flex-col md:flex-row items-center gap-8">
                      <div className="bg-white p-4 rounded-2xl shadow-sm border border-eco-light/50 shrink-0">
                        <QRCode value={upiLink} size={150} />
                      </div>
                      <div className="flex-grow space-y-4">
                        <p className="text-sm text-eco-slate-900/70">
                          Scan this QR code with any UPI app (Google Pay, PhonePe, Paytm, BHIM) to pay <strong>₹{finalTotal.toLocaleString('en-IN')}</strong> securely.
                        </p>
                        <a href={upiLink} className="inline-flex md:hidden btn-premium text-sm py-2 px-4 shadow-none">Open UPI App to Pay</a>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-eco-slate-900 uppercase">Enter UTR / Reference Number</label>
                          <input type="text" name="utr" value={formData.utr} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl border border-eco-light/60 focus:outline-none focus:ring-2 focus:ring-eco-primary/50 focus:border-eco-primary bg-white transition-all text-sm" placeholder="e.g. 301234567890" />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-8 p-5 bg-eco-slate-50 rounded-2xl text-sm text-eco-slate-900/60 leading-relaxed border border-eco-light/50">
                    {paymentMethod === 'upi' ? 'Your payment is secure. We verify transactions instantly.' : 'Please keep exact cash ready at the time of delivery.'}
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="w-full lg:w-[26rem] shrink-0">
            <div className="bg-white rounded-[2.5rem] p-8 lg:p-10 border border-eco-light/60 shadow-xl shadow-eco-primary/5 sticky top-28">
              <h3 className="text-2xl font-heading font-bold text-eco-slate-900 mb-8 tracking-tight">Order Summary</h3>
              
              <div className="space-y-5 mb-8 border-b border-eco-light/60 pb-8">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-eco-slate-50 shrink-0 border border-eco-light/60">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow flex flex-col justify-center">
                      <h4 className="text-sm font-heading font-bold text-eco-slate-900 line-clamp-1 mb-1">{item.name}</h4>
                      <p className="text-[11px] font-semibold text-eco-slate-900/50 uppercase tracking-wider mb-1">Qty: {item.quantity} | {item.size}</p>
                      <p className="text-sm font-bold text-eco-primary">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-5 mb-8 text-[15px]">
                <div className="flex justify-between text-eco-slate-900/70">
                  <span className="font-medium">Subtotal</span>
                  <span className="font-bold text-eco-slate-900">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-eco-slate-900/70">
                  <span className="font-medium">GST (18%)</span>
                  <span className="font-bold text-eco-slate-900">₹{gst.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-eco-slate-900/70">
                  <span className="font-medium">Shipping</span>
                  <span className="font-bold text-eco-slate-900">₹{shipping.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="border-t border-eco-light/50 pt-8 mb-10">
                <div className="flex justify-between items-end mb-1">
                  <span className="font-heading font-bold text-eco-slate-900 text-lg">Total</span>
                  <span className="font-heading font-bold text-3xl text-eco-slate-900">₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <Button type="submit" form="checkout-form" size="lg" disabled={isProcessing} className="w-full h-16 text-base rounded-full shadow-lg shadow-eco-primary/20 hover:-translate-y-1 transition-all duration-300">
                {isProcessing ? 'Processing...' : step === 1 ? 'Continue to Payment' : 'Confirm Order'}
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
