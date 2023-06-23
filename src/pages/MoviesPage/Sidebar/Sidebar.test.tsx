import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { render, screen } from "@testing-library/react";

import { Sidebar } from "./Sidebar";
import useQueryList from "../../../hooks/useQueryList";
import { wrapper } from "../../../utils/tests/queryClientProviderWrapper";

const mockedUseQueryList = useQueryList as jest.Mock<any>;
jest.mock("../../../hooks/useQueryList");

const queryClient = new QueryClient();

const MockSidebarChildren = () => {
  return (
    <>
      {/* user account menu */}
      <div>
        <h2>current username</h2>
      </div>
      {/* movie list navigation  */}
      <nav>
        <h2>My watchlist:</h2>
      </nav>
    </>
  )
}

describe("Sidebar", () => {
  it("should render loading screen when app is loading", () => {
    mockedUseQueryList.mockImplementation(() => ({
      isLoading: true,
    }));

    render(<Sidebar/>, {wrapper});

    expect(screen.getByAltText('Loading')).toBeInTheDocument();
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("should render user account menu when app is not loading", () => {
    mockedUseQueryList.mockImplementation(() => ({
      isLoading: false,
    }));

    render(
      <Sidebar>
        <MockSidebarChildren/>
      </Sidebar>,
      {wrapper}
    );

    expect(screen.queryByText(/loading/i)).toBeNull();
    expect(screen.getByRole("heading", {name: /current username/i})).toBeInTheDocument();
  });

  it("should render movie list navigation when app is not loading", () => {
    mockedUseQueryList.mockImplementation(() => ({
      isLoading: false,
    }));

    render(
      <Sidebar>
        <MockSidebarChildren/>
      </Sidebar>,
      {wrapper}
    );

    expect(screen.queryByText(/loading/i)).toBeNull();
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByRole("heading", {name: /my watchlist/i})).toBeInTheDocument();
  });
});
