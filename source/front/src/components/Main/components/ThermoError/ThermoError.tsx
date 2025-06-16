import { FC } from "react"
import { useStyles } from "@hooks/useStyles"
import styles from './styles.module.scss'
import { Typography } from "@mui/material"

interface Props {
    isVisible: boolean,
    error: string | undefined,
}

export const ThermoError: FC<Props> = ({ isVisible, error }) => {
    
    const cx = useStyles(styles)

    return (
        <>
            {isVisible && error === 'y' && (
                <div className={cx("container")}>
                    {error ? 
                    <Typography
              sx={{ fontSize: "12px", color: "#4a4b42", fontWeight: "700" }}
            >
              Была зафиксирована ошибка в термокосе
            </Typography>
                    : <></>
                    }
                </div>
            )}
        </>
    )
}