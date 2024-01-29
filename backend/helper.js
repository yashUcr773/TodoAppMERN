// generate hash from string
const hasher = (val) => {
    return require("crypto")
        .createHash("sha256")
        .update(val, "utf8")
        .digest("hex");
};

module.exports = {
    hasher,
};
