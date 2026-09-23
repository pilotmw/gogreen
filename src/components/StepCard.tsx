import { motion } from "framer-motion";
import { Leaf, Recycle } from "lucide-react";

interface StepCardProps {
  step: number;
  title: string;
  description: string;
  icon: "leaf" | "recycle";
  index: number;
}

export default function StepCard({ step, title, description, icon, index }: StepCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="flex gap-6 items-start"
    >
      <div className="flex-shrink-0">
        <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
          {step}
        </div>
      </div>
      <div className="flex-grow">
        <div className="flex items-center gap-2 mb-2">
          {icon === "leaf" ? (
            <Leaf className="h-5 w-5 text-primary" />
          ) : (
            <Recycle className="h-5 w-5 text-primary" />
          )}
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        </div>
        <p className="text-gray-700">{description}</p>
      </div>
    </motion.div>
  );
}
