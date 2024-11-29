import { render, screen } from "@testing-library/react";
import Header from "../Header"

describe("Header", ()=>{
    it("should render same text passed into title prop", ()=>{
        render(<Header title="Header"/>);
        const header = screen.getByText(/header/i);
        expect(header).toBeInTheDocument();

    })
})