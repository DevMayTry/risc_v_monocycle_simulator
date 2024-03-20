"use client";

type InputTextAreaProps = {
	title: string,
	placeholder: string,
	rows: number,
	onChange?: (event: any) => void,
	value?: string
}

export const InputTextArea = ({title, placeholder, rows, onChange, value}: InputTextAreaProps) => {
  return (
		<div className="flex-col justify-center items-center w-full h-full p-5">
			<label
				htmlFor="message"
				className="h-10 font-bold "
			>
				{title}
			</label>
			<textarea
				rows={rows}
				className="p-2.5 h-5/6 w-full  text-black bg-purple-200 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				placeholder={placeholder}
				onChange={onChange}
				value={value}
			>
			</textarea>
		</div>
	);
}
