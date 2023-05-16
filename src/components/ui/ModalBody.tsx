type ModalBodyProps = {
  title: string;
  fields?: string[];
  children?: React.ReactNode;
};

const ModalBody = ({ title, fields, children }: ModalBodyProps) => {
  return (
    <div className="h-screen flex flex justify-center align-center">
      <div className="flex flex-col items-center justify-center ">
        <div className="mx-5 my-5 px-5 py-5 bg-zinc-600 rounded-lg shadow-xl">
          <h2 className="font-mono font-bold text-3xl text-center ">{title}</h2>
          <div className="flex flex-col items-center justify-center">
            {fields?.map((field) => (
              <p className="font-mono font-bold text-3xl text-center ">
                {field}
              </p>
            ))}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalBody;
