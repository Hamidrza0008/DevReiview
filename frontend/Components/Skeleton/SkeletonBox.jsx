"use client";

export default function SkeletonBox({
  className = "",
  rounded = "rounded-lg",
}) {
  return (
    <div
      className={`
        relative
        overflow-hidden
        bg-[#E5E7EB]
        ${rounded}
        ${className}
      `}
    >
      {/* Shimmer */}
      <div
        className="
          absolute
          inset-0
          -translate-x-full
          animate-[shimmer_1.6s_infinite]
          bg-gradient-to-r
          from-transparent
          via-white/70
          to-transparent
        "
      />
    </div>
  );
}