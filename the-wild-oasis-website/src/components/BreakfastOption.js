function BreakfastOption({ hasBreakfast = false, breakfastPrice }) {
    console.log(hasBreakfast)

    return (
        <div>
            <label htmlFor='hasBreakfast' className='flex gap-4 p-4 items-start rounded-sm border border-primary-800 cursor-pointer hover:border-accent-500 transition-colors'>
                <input
                    type='checkbox'
                    name='hasBreakfast'
                    id='hasBreakfast'
                    defaultChecked={hasBreakfast}
                    className='h-5 w-5 mt-1 cursor-pointer accent-accent-500'
                />
                <div className="flex flex-col">
                    <span className="font-medium">Include breakfast</span>
                    <span className='text-sm text-primary-200'>+${breakfastPrice} per guest /day</span>
                </div>
            </label>
        </div>
    )
}

export default BreakfastOption
