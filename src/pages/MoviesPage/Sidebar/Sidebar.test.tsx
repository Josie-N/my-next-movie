import React from "react";
import { render, screen } from "@testing-library/react";
import { Sidebar } from "./Sidebar";
import { QueryClient, QueryClientProvider } from "react-query";
import useQueryList from "../../../hooks/useQueryList";

const mockedUseQueryList = useQueryList as jest.Mock<any>;
jest.mock("../../../hooks/useQueryList");

const queryClient = new QueryClient();

const wrapper = ({children} : {children: React.ReactNode}) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);
export default wrapper;

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
  it("should render without crashing", () => {
    mockedUseQueryList.mockImplementation(() => ({
      isLoading: true,
    }));

    // { wrapper }
    //  - is an optional configuration object
    //  - provides a custom wrapper component to wrap the rendered component
    //  - is typically used when you want to provide additional context
    //  - or dependencies to the component being rendered
    render(<Sidebar/>, {wrapper});
  });

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
