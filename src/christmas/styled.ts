import { CreateStyled } from "@emotion/styled"
import origStyled from "@emotion/styled"

export interface Theme {
  colors: {
    link: string
    border: string
    heading: string
    text: string
    bg: string
  }
}

export const theme: Theme = {
  colors: {
    link: "#77a047",
    border: "#d42d2f",
    heading: "#c7375f",
    text: "#708f94",
    bg: "#aed1d9",
  },
}

export const styled = origStyled as CreateStyled<Theme>
