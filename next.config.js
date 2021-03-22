module.exports = {
  async headers() {
    return [
      {
        source: "/pdf-safe-conduct/*",
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
