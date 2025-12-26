import React from 'react'
import { clsx } from 'clsx'

interface TaskbarButtonProps {
    icon?: string,
    iconHover?: string,
    name?: string,
    alt?: string,
    imgWidth?: number,
    imgHeight?: number,
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void,
    btnClassName?: string,
    imgClassName?: string,
    special?: boolean
}

const TaskbarButton = ({
    icon,
    iconHover,
    name,
    alt,
    imgWidth,
    imgHeight,
    onClick,
    btnClassName,
    imgClassName,
    special
}: TaskbarButtonProps) => {
    return (
        <button
            className={clsx(
                "group relative flex flex-row justify-center items-center border-1 border-transparent h-full",
                btnClassName,
                !special && "py-2 px-4 taskbar-icon"
            )}
            onClick={onClick}
        >
            <img className={imgClassName} src={icon} width={imgWidth} height={imgHeight} alt={alt} />

            {iconHover &&
                <img
                    className={clsx(imgClassName, "opacity-0 transition-opacity duration-[350ms] group-hover:opacity-100 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2")}
                    width={imgWidth} height={imgHeight}
                    src={iconHover}
                    alt={alt}
                />}

            <span>{name}</span>
        </button>
    )
}

export default TaskbarButton