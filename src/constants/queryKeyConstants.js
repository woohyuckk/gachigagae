
export const PlACES_QUERY_KEY = {
  PLACES: ["places"],
  PLACE_PLACE_ID: (id) => ["place", id],
}

export const COMMENT_QUERY_KEY = {
  COMMENT: ["comment"],
  COMMENT_PLACE_ID: (place_id) => ["comment", place_id]
}