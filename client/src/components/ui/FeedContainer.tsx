import clsx from "clsx";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const FeedContainer: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <div
      className={clsx(
        "overflow-auto pr-1 h-full rounded-3xl rounded-b-none [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-neutral-700 [&::-webkit-scrollbar-thumb]:rounded-full",
        className
      )}
    >
      {children}
    </div>
  );
};

export default FeedContainer;
