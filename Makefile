# Line Counseling プロジェクト用 Makefile

.PHONY: install dev format lint clean

# Bunを使った依存関係のインストール
install:
	bun install

# 開発サーバーの起動
dev:
	bun run dev

# TypeScriptのフォーマット (Prettier)
format:
	bun prettier --write "src/**/*.{ts,tsx}"

# ESLintによるコードのリント
lint:
	bun run lint

# ビルド
build:
	bun run build

# サーバーの起動（本番環境用）
start:
	bun run start

# キャッシュやビルドファイルの削除
clean:
	rm -rf .next
	rm -rf node_modules/.cache

# ヘルプ（利用可能なコマンドの一覧）
help:
	@echo "利用可能なコマンド:"
	@echo "  make install   - Bunを使って依存関係をインストール"
	@echo "  make dev       - 開発サーバーを起動"
	@echo "  make format    - TypeScriptコードをフォーマット"
	@echo "  make lint      - ESLintでコードをリント"
	@echo "  make build     - プロジェクトをビルド"
	@echo "  make start     - 本番環境用サーバーを起動"
	@echo "  make clean     - キャッシュとビルドファイルを削除"