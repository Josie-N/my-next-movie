import React from "react";
import { screen, render } from "@testing-library/react";
import useQueryList from "../../../hooks/useQueryList";
import MainContent from "./MainContent";

// Make TypeScript happy, by resolving TS errors
const mockedQuery = useQueryList as jest.Mock<any>;

// Mock the custom hook module
jest.mock("../../../hooks/useQueryList");

const MockChildrenContent = () => {
  return (
    <>
    <div>
      <h4>Generic Movie Title</h4>
      <p>
        <span>1234 ∙ </span>
        <span>genre</span>
      </p>
      <p>movie plot</p>
    </div>
    <p>IMDB Rating</p>
    </>
  )
}

describe("MainContent", () => {
  beforeEach(() => {
    mockedQuery.mockImplementation(() => ({ isLoading: true }));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(
      <MainContent>
        <MockChildrenContent />
      </MainContent>
    );
  });

  it("should display heading for non-sighted users", () => {
    mockedQuery.mockImplementation(() => ({
      isLoading: false,
    }));

    render(
      <MainContent>
        <MockChildrenContent />
      </MainContent>
    );

    expect(screen.getByRole("heading", { name: /Browse all movies available/i })).toBeInTheDocument();
  });

  it("renders children when app is not loading", () => {
    mockedQuery.mockImplementation(() => ({
      isLoading: false,
    }));

    render(
      <MainContent>
        <MockChildrenContent />
      </MainContent>
    );

    expect(screen.getByRole("heading", { name: /Generic Movie Title/i })).toBeInTheDocument();
    expect(screen.queryByText(/loading/i)).toBeNull();
  });

  it("renders loading indicator when app is loading", () => {
    render(
      <MainContent>
        <MockChildrenContent />
      </MainContent>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    expect(screen.queryByText(/Generic Movie Title/i)).toBeNull();
  });
})
