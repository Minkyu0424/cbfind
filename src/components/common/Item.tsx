const Item = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col gap-2">
        <img
          className="w-full h-full rounded-xl"
          src="https://placehold.co/109x112"
        />
        <p>에어팟</p>
        <p>한짝밖에 없어요 비에 젖어있었어요 그리</p>
        <div>
          <p>학생회관</p>
          <p>2일전</p>
        </div>
      </div>
    </div>
  );
};

export default Item;
