import { formatBytes } from "./util";

test("formatBytes should handle various cases", () => {
    expect(formatBytes(0)).toBe("0 Bytes")
    expect(formatBytes(106, -2)).toBe("106 Bytes")
    expect(formatBytes(123455506, 2)).toBe("117.74 MiB")
    expect(formatBytes(123455500006, 2)).toBe("114.98 GiB")
})
