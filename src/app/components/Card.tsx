type CardProps = {
  title: string;
  finished: number;
  total: number;
};

export const Card = function ({ title, finished, total }: CardProps) {
  return (
    <div className="w-[280px] text-white h-[100px] shadow-lg rounded-md shadow-[#364e7e1a] py-6 px-3 bg-purple-500 mb-3">
      <h3 className="font-bold">{title}</h3>
      <p>
        {finished} of {total} completed tasks
      </p>
    </div>
  );
};
