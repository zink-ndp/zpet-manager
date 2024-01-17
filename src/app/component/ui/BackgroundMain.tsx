import Circle from "./Circle"

export default function BackgroundMain() {
    return <>
        <div className="bg-white fixed top-0 -z-10 h-[100vh] w-[100%]">
            <div className="fixed -top-60 -left-60">
                <Circle/>
            </div>
            <div className="fixed -bottom-60 -right-64">
                <Circle/>
            </div>
            <div className="fixed top-52 left-[36%]">
                <Circle/>
            </div>
        </div>
    </>
}
