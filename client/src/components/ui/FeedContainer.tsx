import clsx from "clsx";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const FeedContainer: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <div
      className={clsx(
        "overflow-auto pr-1 h-full rounded-3xl rounded-b-none no-scrollbar max-lg:no-scrollbar",
        className
      )}
    >
      {children}
    </div>
  );
};

export default FeedContainer;
