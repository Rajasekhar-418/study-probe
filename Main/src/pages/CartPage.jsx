import { ShoppingCart, Trash2, ArrowRight, Tag } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { INSTRUCTORS } from '@/data/mockData';

export default function CartPage() {
  const { cart, removeFromCart, checkout, navigate, cartTotal } = useApp();

  const savings = cart.reduce((sum, c) => sum + (c.originalPrice - c.price), 0);

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center animate-fade-in">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingCart size={36} className="text-gray-400" />
        </div>
        <h2 className="font-display font-bold text-2xl text-gray-900 mb-3">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Discover courses that will take your skills to the next level.</p>
        <button
          onClick={() => navigate('home')}
          className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          Browse Courses <ArrowRight size={18} />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12 animate-fade-in">
      <h1 className="font-display font-extrabold text-2xl text-gray-900 mb-1">Shopping Cart</h1>
      <p className="text-sm text-gray-500 mb-8">{cart.length} course{cart.length !== 1 ? 's' : ''} in cart</p>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Course list */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((course) => {
            const instructor = INSTRUCTORS.find((i) => i.id === course.instructorId);
            return (
              <div
                key={course.id}
                className="bg-white border border-gray-200 rounded-xl p-4 flex gap-4 hover:shadow-sm transition-shadow"
              >
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-32 h-20 md:w-40 md:h-24 rounded-lg object-cover shrink-0 cursor-pointer"
                  onClick={() => navigate('course-detail', { courseId: course.id })}
                />
                <div className="flex-1 min-w-0 space-y-1">
                  <h3
                    className="font-display font-bold text-sm md:text-base text-gray-900 cursor-pointer hover:text-primary-600 transition-colors line-clamp-2"
                    onClick={() => navigate('course-detail', { courseId: course.id })}
                  >
                    {course.title}
                  </h3>
                  <p className="text-xs text-gray-500">{instructor?.name}</p>
                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-lg font-bold text-gray-900">${course.price}</span>
                    <span className="text-sm text-gray-400 line-through">${course.originalPrice}</span>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(course.id)}
                  className="shrink-0 self-start p-2 text-gray-400 hover:text-error-500 hover:bg-error-50 rounded-lg transition-colors"
                  aria-label="Remove from cart"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Checkout summary */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-xl p-6 lg:sticky lg:top-20">
            <h2 className="font-display font-bold text-lg text-gray-900 mb-4">Order Summary</h2>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-success-600">
                <span className="flex items-center gap-1">
                  <Tag size={14} /> Savings
                </span>
                <span>-${savings.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (8%)</span>
                <span>${(cartTotal * 0.08).toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between font-bold text-gray-900">
              <span>Total</span>
              <span>${(cartTotal * 1.08).toFixed(2)}</span>
            </div>

            <button
              onClick={checkout}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-xl transition-colors mt-5 flex items-center justify-center gap-2"
            >
              Checkout <ArrowRight size={18} />
            </button>

            <button
              onClick={() => navigate('home')}
              className="w-full text-sm text-gray-600 hover:text-primary-600 font-medium py-2.5 mt-2 transition-colors"
            >
              Continue shopping
            </button>

            <p className="text-xs text-gray-400 text-center mt-4">
              Secure checkout · 30-day money-back guarantee
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
