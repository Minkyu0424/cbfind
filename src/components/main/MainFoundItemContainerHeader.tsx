interface MainFoundItemContainerHeaderProps {
  title: string;
}

const MainFoundItemContainerHeader = ({
  title,
}: MainFoundItemContainerHeaderProps) => {
  return (
    <div className="flex items-end w-full px-3 py-2.5 justify-between border-b border-b-[var(--gray)]">
      <p className="text-2xl font-semibold">{title}</p>
    </div>
  );
};

export default MainFoundItemContainerHeader;
