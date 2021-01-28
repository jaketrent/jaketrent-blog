import { jest } from "@jest/globals"

export const stabilizeDate = (date: Date) => {
  const dateStub = jest
    .spyOn(global, "Date")
    .mockImplementation(() => date as any)

  return () => {
    dateStub.mockRestore()
  }
}
