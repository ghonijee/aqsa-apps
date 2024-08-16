import dynamic from "next/dynamic";
import { memo, Suspense } from "react";
import { LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";

const fallback = <div style={{ background: "#ddd", width: 20, height: 20 }} />;

interface IconProps extends LucideProps {
  name: keyof typeof dynamicIconImports;
}

const DynamicIcon = memo(({ name, ...props }: IconProps) => {
  const LucideIcon = dynamic(dynamicIconImports[name]);

  return (
    <Suspense fallback={fallback}>
      <LucideIcon {...props} />
    </Suspense>
  );
});

DynamicIcon.displayName = "Icon";

export default DynamicIcon;
