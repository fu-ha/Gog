//next/jest プラグインを介す場合、ts-jest や @types/jest のインストールが不要。
const nextJest = require("next/jest")

const createJestConfig = nextJest({
  // next.config.jsとテスト環境用の.envファイルが配置されたディレクトリをセット。基本は"./"で良い。
  dir: "./",
})
const customJestConfig = {
  // jest.setup.jsを作成する場合のみ定義。
  // setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    // aliasを定義 （tsconfig.jsonのcompilerOptions>pathsの定義に合わせる）
    "^@/components/(.*)$": "<rootDir>/components/$1",
    "^@/pages/(.*)$": "<rootDir>/pages/$1",
  },
  testEnvironment: "jest-environment-jsdom",
}

// createJestConfigを定義することによって、本ファイルで定義された設定がNext.jsの設定に反映される。
module.exports = createJestConfig(customJestConfig)

