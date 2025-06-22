import { useState } from "react";
import { MockOptions } from "../../constants/items";
import { MockItems } from "../../constants/mock";
import Item from "../common/Item";
import Pagination from "../common/Pagination";
import MainItemContainerHeader from "../main/MainItemContainerHeader";
import ItemsFilterDropdown from "./ItemsFilterDropdown";

const LostItemsContainer = () => {
    const [, setFilterOption] = useState<string>("");
    const [page, setPage] = useState<number>(0);
    return (
      <div className="size-full">
        <MainItemContainerHeader title="찾았어요" />
        <div className="w-full flex justify-end pt-3">
          <ItemsFilterDropdown options={MockOptions} onSelect={setFilterOption} />
        </div>
        <div className="flex px-2 gap-y-5 justify-between flex-wrap pt-5 pb-3">
          {MockItems.slice(0, 9).map((item) => (
            <Item key={item.title} item={item} />
          ))}
        </div>
        <Pagination currentPage={page} totalPages={5} onPageChange={setPage} />
      </div>
    );
};

export default LostItemsContainer;
