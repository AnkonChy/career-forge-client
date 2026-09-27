"use client";

import React, { useState } from "react";
import { Course } from "@/types/course";
import { X, CheckCircle2, ShieldCheck, CreditCard, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

interface EnrollModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
}

export const EnrollModal: React.FC<EnrollModalProps> = ({
  course,
  isOpen,
  onClose,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<"bkash" | "nagad" | "card">("bkash");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !course) return null;

  const payablePrice = Number(course.discount_price || course.price);

  const handleConfirmEnrollment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success(`Successfully enrolled in ${course.title}! Welcome aboard 🎉`);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-neutral-200 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 rounded-lg bg-blue-50 text-[#0072bc]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-neutral-900">Checkout & Enrollment</h3>
            <p className="text-xs text-neutral-500">Secure 256-bit encrypted transaction</p>
          </div>
        </div>

        {/* Selected Course Summary */}
        <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200/70 mb-4">
          <div className="text-xs text-[#0072bc] font-semibold mb-1">Enrolling Course</div>
          <div className="text-sm font-bold text-neutral-900 line-clamp-1">{course.title}</div>
          <div className="text-xs text-neutral-500 mt-0.5">Instructor: {course.instructor_name}</div>
          <div className="mt-2 pt-2 border-t border-neutral-200/80 flex justify-between items-center text-sm">
            <span className="text-neutral-600 font-medium">Total Amount:</span>
            <span className="text-base font-bold text-neutral-900">৳ {payablePrice.toLocaleString()}</span>
          </div>
        </div>

        <form onSubmit={handleConfirmEnrollment}>
          {/* Payment Method Selector */}
          <div className="mb-4">
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
              Select Payment Method
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "bkash", label: "bKash", color: "border-pink-500 bg-pink-50/50 text-pink-700" },
                { id: "nagad", label: "Nagad", color: "border-orange-500 bg-orange-50/50 text-orange-700" },
                { id: "card", label: "Card / Bank", color: "border-blue-500 bg-blue-50/50 text-blue-700" },
              ].map((method) => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setPaymentMethod(method.id as any)}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                    paymentMethod === method.id
                      ? `${method.color} border-2 shadow-xs`
                      : "border-neutral-200 text-neutral-600 hover:bg-neutral-50"
                  }`}
                >
                  <span>{method.label}</span>
                  {paymentMethod === method.id && (
                    <span className="text-[10px] text-[#0072bc]">● Selected</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-5 flex items-center gap-2 text-xs text-neutral-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Instant access provided upon confirmation. 7-day money back guarantee.</span>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="w-1/3 py-2.5 rounded-xl border border-neutral-300 text-neutral-700 hover:bg-neutral-100 text-sm font-semibold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-2/3 py-2.5 rounded-xl bg-[#0072bc] hover:bg-[#005ea6] text-white text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              {isSubmitting ? (
                <span>Processing...</span>
              ) : (
                <>
                  <span>Pay ৳ {payablePrice.toLocaleString()} & Enroll</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
