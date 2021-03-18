module.exports = {
  async headers() {
    return [
      {
        source: "/pdf-safe-conduct/*",
        headers: [
          {
            "content-type": "application/pdf",
          },
        ],
      },
    ]
  },
}
