# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Cài đặt dependencies trước
COPY package*.json ./
RUN npm ci

# Sao chép source code
COPY . .

# Build ứng dụng
RUN npm run build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

# Cài đặt chỉ production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Sao chép build output và public files từ builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./

# Tối ưu production
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Sử dụng non-root user cho bảo mật
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
RUN chown -R nextjs:nodejs /app
USER nextjs

# Expose cổng 3000
EXPOSE 3000

# Khởi động ứng dụng
CMD ["npm", "start"]