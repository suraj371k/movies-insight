import { GET } from "@/app/api/movies/route";
import { jest } from "@jest/globals";
import { NextRequest } from "next/server";
import { beforeEach, afterEach, describe, it, expect } from "@jest/globals";

describe("GET /api/movies", () => {
  let mockFetch: jest.SpiedFunction<typeof fetch>;

  beforeEach(() => {
    mockFetch = jest.spyOn(global, "fetch" as any);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should return 400 if query is missing", async () => {
    const request = new NextRequest("http://localhost:3000/api/movies");

    const response = await GET(request);
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.error).toBe("missing query");
  });

  it("should return movie data for valid IMDb ID", async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => ({
        Title: "Inception",
        Response: "True",
      }),
    } as any);

    const request = new NextRequest(
      "http://localhost:3000/api/movies?query=tt1375666"
    );

    const response = await GET(request);
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.Title).toBe("Inception");
    expect(mockFetch).toHaveBeenCalled();
  });

  it("should return 404 if OMDb returns False", async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => ({
        Response: "False",
        Error: "Movie not found!",
      }),
    } as any);

    const request = new NextRequest(
      "http://localhost:3000/api/movies?query=invalid"
    );

    const response = await GET(request);
    const json = await response.json();

    expect(response.status).toBe(404);
    expect(json.error).toBe("Movie not found!");
  });

  it("should return 500 if fetch throws error", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network error"));

    const request = new NextRequest(
      "http://localhost:3000/api/movies?query=tt1375666"
    );

    const response = await GET(request);
    const json = await response.json();

    expect(response.status).toBe(500);
    expect(json.error).toBe("Failed to fetch movie data");
  });
});