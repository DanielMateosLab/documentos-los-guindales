module.exports = {
  async headers() {
    return [
      {
        source: "/safe-conduct/:name*",
        headers: [
          {
            key: "content-type",
            value: "application/pdf",
          },
        ],
      },
    ]
  },
}
