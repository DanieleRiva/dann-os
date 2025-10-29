import React from 'react'
import { clsx } from 'clsx'

interface TaskbarButtonProps {
    icon?: string,
    iconHover?: string,
    name?: string,
    alt?: string,
    width?: number,
    height?: number,
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void,
    btnClassName?: string,
    imgClassName?: string
}

const TaskbarButton = ({ icon, iconHover, name, alt, width, height, onClick, btnClassName, imgClassName }: TaskbarButtonProps) => {
    return (
        <button
            className={clsx("group cursor-pointer relative flex flex-row items-center", btnClassName)}
            onClick={onClick}
        >
            <img className={imgClassName} src={icon} width={width} height={height} alt={alt} />

            {iconHover &&
                <img
                    className={clsx(imgClassName, "opacity-0 transition-opacity duration-[350ms] group-hover:opacity-100 absolute left-0 bottom-0")}
                    width={width} height={height}
                    src={iconHover}
                    alt={alt}
                />}

            <span>{name}</span>
        </button>
    )
}

export default TaskbarButton