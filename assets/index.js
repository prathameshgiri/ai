(function() {
    const e = document.createElement("link").relList;
    if (e && e.supports && e.supports("modulepreload")) return;
    for (const c of document.querySelectorAll('link[rel="modulepreload"]')) n(c);
    new MutationObserver(c => {
        for (const r of c)
            if (r.type === "childList")
                for (const o of r.addedNodes) o.tagName === "LINK" && o.rel === "modulepreload" && n(o)
    }).observe(document, {
        childList: !0,
        subtree: !0
    });

    function t(c) {
        const r = {};
        return c.integrity && (r.integrity = c.integrity), c.referrerPolicy && (r.referrerPolicy = c.referrerPolicy), c.crossOrigin === "use-credentials" ? r.credentials = "include" : c.crossOrigin === "anonymous" ? r.credentials = "omit" : r.credentials = "same-origin", r
    }

    function n(c) {
        if (c.ep) return;
        c.ep = !0;
        const r = t(c);
        fetch(c.href, r)
    }
})();
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var qu;
(function(u) {
    u.HARM_CATEGORY_UNSPECIFIED = "HARM_CATEGORY_UNSPECIFIED", u.HARM_CATEGORY_HATE_SPEECH = "HARM_CATEGORY_HATE_SPEECH", u.HARM_CATEGORY_SEXUALLY_EXPLICIT = "HARM_CATEGORY_SEXUALLY_EXPLICIT", u.HARM_CATEGORY_HARASSMENT = "HARM_CATEGORY_HARASSMENT", u.HARM_CATEGORY_DANGEROUS_CONTENT = "HARM_CATEGORY_DANGEROUS_CONTENT"
})(qu || (qu = {}));
var zu;
(function(u) {
    u.HARM_BLOCK_THRESHOLD_UNSPECIFIED = "HARM_BLOCK_THRESHOLD_UNSPECIFIED", u.BLOCK_LOW_AND_ABOVE = "BLOCK_LOW_AND_ABOVE", u.BLOCK_MEDIUM_AND_ABOVE = "BLOCK_MEDIUM_AND_ABOVE", u.BLOCK_ONLY_HIGH = "BLOCK_ONLY_HIGH", u.BLOCK_NONE = "BLOCK_NONE"
})(zu || (zu = {}));
var Pu;
(function(u) {
    u.HARM_PROBABILITY_UNSPECIFIED = "HARM_PROBABILITY_UNSPECIFIED", u.NEGLIGIBLE = "NEGLIGIBLE", u.LOW = "LOW", u.MEDIUM = "MEDIUM", u.HIGH = "HIGH"
})(Pu || (Pu = {}));
var $u;
(function(u) {
    u.BLOCKED_REASON_UNSPECIFIED = "BLOCKED_REASON_UNSPECIFIED", u.SAFETY = "SAFETY", u.OTHER = "OTHER"
})($u || ($u = {}));
var au;
(function(u) {
    u.FINISH_REASON_UNSPECIFIED = "FINISH_REASON_UNSPECIFIED", u.STOP = "STOP", u.MAX_TOKENS = "MAX_TOKENS", u.SAFETY = "SAFETY", u.RECITATION = "RECITATION", u.OTHER = "OTHER"
})(au || (au = {}));
var ju;
(function(u) {
    u.TASK_TYPE_UNSPECIFIED = "TASK_TYPE_UNSPECIFIED", u.RETRIEVAL_QUERY = "RETRIEVAL_QUERY", u.RETRIEVAL_DOCUMENT = "RETRIEVAL_DOCUMENT", u.SEMANTIC_SIMILARITY = "SEMANTIC_SIMILARITY", u.CLASSIFICATION = "CLASSIFICATION", u.CLUSTERING = "CLUSTERING"
})(ju || (ju = {}));
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class K extends Error {
    constructor(e) {
        super(`[GoogleGenerativeAI Error]: ${e}`)
    }
}
class Hu extends K {
    constructor(e, t) {
        super(e), this.response = t
    }
}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const j0 = "https://generativelanguage.googleapis.com",
    H0 = "v1",
    U0 = "0.2.1",
    G0 = "genai-js";
var z;
(function(u) {
    u.GENERATE_CONTENT = "generateContent", u.STREAM_GENERATE_CONTENT = "streamGenerateContent", u.COUNT_TOKENS = "countTokens", u.EMBED_CONTENT = "embedContent", u.BATCH_EMBED_CONTENTS = "batchEmbedContents"
})(z || (z = {}));
class eu {
    constructor(e, t, n, c) {
        this.model = e, this.task = t, this.apiKey = n, this.stream = c
    }
    toString() {
        let e = `${j0}/${H0}/${this.model}:${this.task}`;
        return this.stream && (e += "?alt=sse"), e
    }
}

function Z0() {
    return `${G0}/${U0}`
}
async function tu(u, e, t) {
    let n;
    try {
        if (n = await fetch(u.toString(), Object.assign(Object.assign({}, V0(t)), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-goog-api-client": Z0(),
                    "x-goog-api-key": u.apiKey
                },
                body: e
            })), !n.ok) {
            let c = "";
            try {
                const r = await n.json();
                c = r.error.message, r.error.details && (c += ` ${JSON.stringify(r.error.details)}`)
            } catch {}
            throw new Error(`[${n.status} ${n.statusText}] ${c}`)
        }
    } catch (c) {
        const r = new K(`Error fetching from ${u.toString()}: ${c.message}`);
        throw r.stack = c.stack, r
    }
    return n
}

function V0(u) {
    const e = {};
    if ((u == null ? void 0 : u.timeout) >= 0) {
        const t = new AbortController,
            n = t.signal;
        setTimeout(() => t.abort(), u.timeout), e.signal = n
    }
    return e
}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Su(u) {
    return u.text = () => {
        if (u.candidates && u.candidates.length > 0) {
            if (u.candidates.length > 1 && console.warn(`This response had ${u.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`), f0(u.candidates[0])) throw new Hu(`${su(u)}`, u);
            return K0(u)
        } else if (u.promptFeedback) throw new Hu(`Text not available. ${su(u)}`, u);
        return ""
    }, u
}

function K0(u) {
    var e, t, n, c;
    return !((c = (n = (t = (e = u.candidates) === null || e === void 0 ? void 0 : e[0].content) === null || t === void 0 ? void 0 : t.parts) === null || n === void 0 ? void 0 : n[0]) === null || c === void 0) && c.text ? u.candidates[0].content.parts[0].text : ""
}
const W0 = [au.RECITATION, au.SAFETY];

function f0(u) {
    return !!u.finishReason && W0.includes(u.finishReason)
}

function su(u) {
    var e, t, n;
    let c = "";
    if ((!u.candidates || u.candidates.length === 0) && u.promptFeedback) c += "Response was blocked", !((e = u.promptFeedback) === null || e === void 0) && e.blockReason && (c += ` due to ${u.promptFeedback.blockReason}`), !((t = u.promptFeedback) === null || t === void 0) && t.blockReasonMessage && (c += `: ${u.promptFeedback.blockReasonMessage}`);
    else if (!((n = u.candidates) === null || n === void 0) && n[0]) {
        const r = u.candidates[0];
        f0(r) && (c += `Candidate was blocked due to ${r.finishReason}`, r.finishMessage && (c += `: ${r.finishMessage}`))
    }
    return c
}

function W(u) {
    return this instanceof W ? (this.v = u, this) : new W(u)
}

function Y0(u, e, t) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var n = t.apply(u, e || []),
        c, r = [];
    return c = {}, o("next"), o("throw"), o("return"), c[Symbol.asyncIterator] = function() {
        return this
    }, c;

    function o(b) {
        n[b] && (c[b] = function(h) {
            return new Promise(function(l, m) {
                r.push([b, h, l, m]) > 1 || i(b, h)
            })
        })
    }

    function i(b, h) {
        try {
            a(n[b](h))
        } catch (l) {
            f(r[0][3], l)
        }
    }

    function a(b) {
        b.value instanceof W ? Promise.resolve(b.value.v).then(s, d) : f(r[0][2], b)
    }

    function s(b) {
        i("next", b)
    }

    function d(b) {
        i("throw", b)
    }

    function f(b, h) {
        b(h), r.shift(), r.length && i(r[0][0], r[0][1])
    }
}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Uu = /^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;

function J0(u) {
    const e = u.body.pipeThrough(new TextDecoderStream("utf8", {
            fatal: !0
        })),
        t = ue(e),
        [n, c] = t.tee();
    return {
        stream: X0(n),
        response: Q0(c)
    }
}
async function Q0(u) {
    const e = [],
        t = u.getReader();
    for (;;) {
        const {
            done: n,
            value: c
        } = await t.read();
        if (n) return Su(ee(e));
        e.push(c)
    }
}

function X0(u) {
    return Y0(this, arguments, function*() {
        const t = u.getReader();
        for (;;) {
            const {
                value: n,
                done: c
            } = yield W(t.read());
            if (c) break;
            yield yield W(Su(n))
        }
    })
}

function ue(u) {
    const e = u.getReader();
    return new ReadableStream({
        start(n) {
            let c = "";
            return r();

            function r() {
                return e.read().then(({
                    value: o,
                    done: i
                }) => {
                    if (i) {
                        if (c.trim()) {
                            n.error(new K("Failed to parse stream"));
                            return
                        }
                        n.close();
                        return
                    }
                    c += o;
                    let a = c.match(Uu),
                        s;
                    for (; a;) {
                        try {
                            s = JSON.parse(a[1])
                        } catch {
                            n.error(new K(`Error parsing JSON response: "${a[1]}"`));
                            return
                        }
                        n.enqueue(s), c = c.substring(a[0].length), a = c.match(Uu)
                    }
                    return r()
                })
            }
        }
    })
}

function ee(u) {
    const e = u[u.length - 1],
        t = {
            promptFeedback: e == null ? void 0 : e.promptFeedback
        };
    for (const n of u)
        if (n.candidates)
            for (const c of n.candidates) {
                const r = c.index;
                if (t.candidates || (t.candidates = []), t.candidates[r] || (t.candidates[r] = {
                        index: c.index
                    }), t.candidates[r].citationMetadata = c.citationMetadata, t.candidates[r].finishReason = c.finishReason, t.candidates[r].finishMessage = c.finishMessage, t.candidates[r].safetyRatings = c.safetyRatings, c.content && c.content.parts) {
                    t.candidates[r].content || (t.candidates[r].content = {
                        role: c.content.role || "user",
                        parts: [{
                            text: ""
                        }]
                    });
                    for (const o of c.content.parts) o.text && (t.candidates[r].content.parts[0].text += o.text)
                }
            }
    return t
}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function l0(u, e, t, n) {
    const c = new eu(e, z.STREAM_GENERATE_CONTENT, u, !0),
        r = await tu(c, JSON.stringify(t), n);
    return J0(r)
}
async function d0(u, e, t, n) {
    const c = new eu(e, z.GENERATE_CONTENT, u, !1),
        o = await (await tu(c, JSON.stringify(t), n)).json();
    return {
        response: Su(o)
    }
}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function V(u, e) {
    let t = [];
    if (typeof u == "string") t = [{
        text: u
    }];
    else
        for (const n of u) typeof n == "string" ? t.push({
            text: n
        }) : t.push(n);
    return {
        role: e,
        parts: t
    }
}

function _u(u) {
    return u.contents ? u : {
        contents: [V(u, "user")]
    }
}

function te(u) {
    return typeof u == "string" || Array.isArray(u) ? {
        content: V(u, "user")
    } : u
}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Gu = "SILENT_ERROR";
class ne {
    constructor(e, t, n, c) {
        this.model = t, this.params = n, this.requestOptions = c, this._history = [], this._sendPromise = Promise.resolve(), this._apiKey = e, n != null && n.history && (this._history = n.history.map(r => {
            if (!r.role) throw new Error("Missing role for history item: " + JSON.stringify(r));
            return V(r.parts, r.role)
        }))
    }
    async getHistory() {
        return await this._sendPromise, this._history
    }
    async sendMessage(e) {
        var t, n;
        await this._sendPromise;
        const c = V(e, "user"),
            r = {
                safetySettings: (t = this.params) === null || t === void 0 ? void 0 : t.safetySettings,
                generationConfig: (n = this.params) === null || n === void 0 ? void 0 : n.generationConfig,
                contents: [...this._history, c]
            };
        let o;
        return this._sendPromise = this._sendPromise.then(() => d0(this._apiKey, this.model, r, this.requestOptions)).then(i => {
            var a;
            if (i.response.candidates && i.response.candidates.length > 0) {
                this._history.push(c);
                const s = Object.assign({
                    parts: [],
                    role: "model"
                }, (a = i.response.candidates) === null || a === void 0 ? void 0 : a[0].content);
                this._history.push(s)
            } else {
                const s = su(i.response);
                s && console.warn(`sendMessage() was unsuccessful. ${s}. Inspect response object for details.`)
            }
            o = i
        }), await this._sendPromise, o
    }
    async sendMessageStream(e) {
        var t, n;
        await this._sendPromise;
        const c = V(e, "user"),
            r = {
                safetySettings: (t = this.params) === null || t === void 0 ? void 0 : t.safetySettings,
                generationConfig: (n = this.params) === null || n === void 0 ? void 0 : n.generationConfig,
                contents: [...this._history, c]
            },
            o = l0(this._apiKey, this.model, r, this.requestOptions);
        return this._sendPromise = this._sendPromise.then(() => o).catch(i => {
            throw new Error(Gu)
        }).then(i => i.response).then(i => {
            if (i.candidates && i.candidates.length > 0) {
                this._history.push(c);
                const a = Object.assign({}, i.candidates[0].content);
                a.role || (a.role = "model"), this._history.push(a)
            } else {
                const a = su(i);
                a && console.warn(`sendMessageStream() was unsuccessful. ${a}. Inspect response object for details.`)
            }
        }).catch(i => {
            i.message !== Gu && console.error(i)
        }), o
    }
}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function re(u, e, t, n) {
    const c = new eu(e, z.COUNT_TOKENS, u, !1);
    return (await tu(c, JSON.stringify(Object.assign(Object.assign({}, t), {
        model: e
    })), n)).json()
}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function ce(u, e, t, n) {
    const c = new eu(e, z.EMBED_CONTENT, u, !1);
    return (await tu(c, JSON.stringify(t), n)).json()
}
async function ie(u, e, t, n) {
    const c = new eu(e, z.BATCH_EMBED_CONTENTS, u, !1),
        r = t.requests.map(i => Object.assign(Object.assign({}, i), {
            model: e
        }));
    return (await tu(c, JSON.stringify({
        requests: r
    }), n)).json()
}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class oe {
    constructor(e, t, n) {
        this.apiKey = e, t.model.includes("/") ? this.model = t.model : this.model = `models/${t.model}`, this.generationConfig = t.generationConfig || {}, this.safetySettings = t.safetySettings || [], this.requestOptions = n || {}
    }
    async generateContent(e) {
        const t = _u(e);
        return d0(this.apiKey, this.model, Object.assign({
            generationConfig: this.generationConfig,
            safetySettings: this.safetySettings
        }, t), this.requestOptions)
    }
    async generateContentStream(e) {
        const t = _u(e);
        return l0(this.apiKey, this.model, Object.assign({
            generationConfig: this.generationConfig,
            safetySettings: this.safetySettings
        }, t), this.requestOptions)
    }
    startChat(e) {
        return new ne(this.apiKey, this.model, e, this.requestOptions)
    }
    async countTokens(e) {
        const t = _u(e);
        return re(this.apiKey, this.model, t)
    }
    async embedContent(e) {
        const t = te(e);
        return ce(this.apiKey, this.model, t)
    }
    async batchEmbedContents(e) {
        return ie(this.apiKey, this.model, e, this.requestOptions)
    }
}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ae {
    constructor(e) {
        this.apiKey = e
    }
    getGenerativeModel(e, t) {
        if (!e.model) throw new K("Must provide a model name. Example: genai.getGenerativeModel({ model: 'my-model-name' })");
        return new oe(this.apiKey, e, t)
    }
}
const Zu = {};

function se(u) {
    let e = Zu[u];
    if (e) return e;
    e = Zu[u] = [];
    for (let t = 0; t < 128; t++) {
        const n = String.fromCharCode(t);
        e.push(n)
    }
    for (let t = 0; t < u.length; t++) {
        const n = u.charCodeAt(t);
        e[n] = "%" + ("0" + n.toString(16).toUpperCase()).slice(-2)
    }
    return e
}

function U(u, e) {
    typeof e != "string" && (e = U.defaultChars);
    const t = se(e);
    return u.replace(/(%[a-f0-9]{2})+/gi, function(n) {
        let c = "";
        for (let r = 0, o = n.length; r < o; r += 3) {
            const i = parseInt(n.slice(r + 1, r + 3), 16);
            if (i < 128) {
                c += t[i];
                continue
            }
            if ((i & 224) === 192 && r + 3 < o) {
                const a = parseInt(n.slice(r + 4, r + 6), 16);
                if ((a & 192) === 128) {
                    const s = i << 6 & 1984 | a & 63;
                    s < 128 ? c += "��" : c += String.fromCharCode(s), r += 3;
                    continue
                }
            }
            if ((i & 240) === 224 && r + 6 < o) {
                const a = parseInt(n.slice(r + 4, r + 6), 16),
                    s = parseInt(n.slice(r + 7, r + 9), 16);
                if ((a & 192) === 128 && (s & 192) === 128) {
                    const d = i << 12 & 61440 | a << 6 & 4032 | s & 63;
                    d < 2048 || d >= 55296 && d <= 57343 ? c += "���" : c += String.fromCharCode(d), r += 6;
                    continue
                }
            }
            if ((i & 248) === 240 && r + 9 < o) {
                const a = parseInt(n.slice(r + 4, r + 6), 16),
                    s = parseInt(n.slice(r + 7, r + 9), 16),
                    d = parseInt(n.slice(r + 10, r + 12), 16);
                if ((a & 192) === 128 && (s & 192) === 128 && (d & 192) === 128) {
                    let f = i << 18 & 1835008 | a << 12 & 258048 | s << 6 & 4032 | d & 63;
                    f < 65536 || f > 1114111 ? c += "����" : (f -= 65536, c += String.fromCharCode(55296 + (f >> 10), 56320 + (f & 1023))), r += 9;
                    continue
                }
            }
            c += "�"
        }
        return c
    })
}
U.defaultChars = ";/?:@&=+$,#";
U.componentChars = "";
const Vu = {};

function fe(u) {
    let e = Vu[u];
    if (e) return e;
    e = Vu[u] = [];
    for (let t = 0; t < 128; t++) {
        const n = String.fromCharCode(t);
        /^[0-9a-z]$/i.test(n) ? e.push(n) : e.push("%" + ("0" + t.toString(16).toUpperCase()).slice(-2))
    }
    for (let t = 0; t < u.length; t++) e[u.charCodeAt(t)] = u[t];
    return e
}

function nu(u, e, t) {
    typeof e != "string" && (t = e, e = nu.defaultChars), typeof t > "u" && (t = !0);
    const n = fe(e);
    let c = "";
    for (let r = 0, o = u.length; r < o; r++) {
        const i = u.charCodeAt(r);
        if (t && i === 37 && r + 2 < o && /^[0-9a-f]{2}$/i.test(u.slice(r + 1, r + 3))) {
            c += u.slice(r, r + 3), r += 2;
            continue
        }
        if (i < 128) {
            c += n[i];
            continue
        }
        if (i >= 55296 && i <= 57343) {
            if (i >= 55296 && i <= 56319 && r + 1 < o) {
                const a = u.charCodeAt(r + 1);
                if (a >= 56320 && a <= 57343) {
                    c += encodeURIComponent(u[r] + u[r + 1]), r++;
                    continue
                }
            }
            c += "%EF%BF%BD";
            continue
        }
        c += encodeURIComponent(u[r])
    }
    return c
}
nu.defaultChars = ";/?:@&=+$,-_.!~*'()#";
nu.componentChars = "-_.!~*'()";

function vu(u) {
    let e = "";
    return e += u.protocol || "", e += u.slashes ? "//" : "", e += u.auth ? u.auth + "@" : "", u.hostname && u.hostname.indexOf(":") !== -1 ? e += "[" + u.hostname + "]" : e += u.hostname || "", e += u.port ? ":" + u.port : "", e += u.pathname || "", e += u.search || "", e += u.hash || "", e
}

function fu() {
    this.protocol = null, this.slashes = null, this.auth = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.pathname = null
}
const le = /^([a-z0-9.+-]+:)/i,
    de = /:[0-9]*$/,
    he = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
    be = ["<", ">", '"', "`", " ", "\r", `
`, "	"],
    pe = ["{", "}", "|", "\\", "^", "`"].concat(be),
    xe = ["'"].concat(pe),
    Ku = ["%", "/", "?", ";", "#"].concat(xe),
    Wu = ["/", "?", "#"],
    _e = 255,
    Yu = /^[+a-z0-9A-Z_-]{0,63}$/,
    me = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    Ju = {
        javascript: !0,
        "javascript:": !0
    },
    Qu = {
        http: !0,
        https: !0,
        ftp: !0,
        gopher: !0,
        file: !0,
        "http:": !0,
        "https:": !0,
        "ftp:": !0,
        "gopher:": !0,
        "file:": !0
    };

function Tu(u, e) {
    if (u && u instanceof fu) return u;
    const t = new fu;
    return t.parse(u, e), t
}
fu.prototype.parse = function(u, e) {
    let t, n, c, r = u;
    if (r = r.trim(), !e && u.split("#").length === 1) {
        const s = he.exec(r);
        if (s) return this.pathname = s[1], s[2] && (this.search = s[2]), this
    }
    let o = le.exec(r);
    if (o && (o = o[0], t = o.toLowerCase(), this.protocol = o, r = r.substr(o.length)), (e || o || r.match(/^\/\/[^@\/]+@[^@\/]+/)) && (c = r.substr(0, 2) === "//", c && !(o && Ju[o]) && (r = r.substr(2), this.slashes = !0)), !Ju[o] && (c || o && !Qu[o])) {
        let s = -1;
        for (let l = 0; l < Wu.length; l++) n = r.indexOf(Wu[l]), n !== -1 && (s === -1 || n < s) && (s = n);
        let d, f;
        s === -1 ? f = r.lastIndexOf("@") : f = r.lastIndexOf("@", s), f !== -1 && (d = r.slice(0, f), r = r.slice(f + 1), this.auth = d), s = -1;
        for (let l = 0; l < Ku.length; l++) n = r.indexOf(Ku[l]), n !== -1 && (s === -1 || n < s) && (s = n);
        s === -1 && (s = r.length), r[s - 1] === ":" && s--;
        const b = r.slice(0, s);
        r = r.slice(s), this.parseHost(b), this.hostname = this.hostname || "";
        const h = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
        if (!h) {
            const l = this.hostname.split(/\./);
            for (let m = 0, g = l.length; m < g; m++) {
                const k = l[m];
                if (k && !k.match(Yu)) {
                    let E = "";
                    for (let x = 0, _ = k.length; x < _; x++) k.charCodeAt(x) > 127 ? E += "x" : E += k[x];
                    if (!E.match(Yu)) {
                        const x = l.slice(0, m),
                            _ = l.slice(m + 1),
                            p = k.match(me);
                        p && (x.push(p[1]), _.unshift(p[2])), _.length && (r = _.join(".") + r), this.hostname = x.join(".");
                        break
                    }
                }
            }
        }
        this.hostname.length > _e && (this.hostname = ""), h && (this.hostname = this.hostname.substr(1, this.hostname.length - 2))
    }
    const i = r.indexOf("#");
    i !== -1 && (this.hash = r.substr(i), r = r.slice(0, i));
    const a = r.indexOf("?");
    return a !== -1 && (this.search = r.substr(a), r = r.slice(0, a)), r && (this.pathname = r), Qu[t] && this.hostname && !this.pathname && (this.pathname = ""), this
};
fu.prototype.parseHost = function(u) {
    let e = de.exec(u);
    e && (e = e[0], e !== ":" && (this.port = e.substr(1)), u = u.substr(0, u.length - e.length)), u && (this.hostname = u)
};
const ge = Object.freeze(Object.defineProperty({
        __proto__: null,
        decode: U,
        encode: nu,
        format: vu,
        parse: Tu
    }, Symbol.toStringTag, {
        value: "Module"
    })),
    h0 = /[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,
    b0 = /[\0-\x1F\x7F-\x9F]/,
    ke = /[\xAD\u0600-\u0605\u061C\u06DD\u070F\u0890\u0891\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD80D[\uDC30-\uDC3F]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/,
    Iu = /[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDEAD\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2\uDF00-\uDF09]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDF43-\uDF4F\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A\uDFE2]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/,
    Ee = /[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u0888\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20C0\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B97-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFF\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u31EF\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBC2\uFD40-\uFD4F\uFDCF\uFDFC-\uFDFF\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD833[\uDF50-\uDFC3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDEA\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED7\uDEDC-\uDEEC\uDEF0-\uDEFC\uDF00-\uDF76\uDF7B-\uDFD9\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0\uDCB1\uDD00-\uDE53\uDE60-\uDE6D\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC5\uDECE-\uDEDB\uDEE0-\uDEE8\uDEF0-\uDEF8\uDF00-\uDF92\uDF94-\uDFCA]/,
    p0 = /[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/,
    Ce = Object.freeze(Object.defineProperty({
        __proto__: null,
        Any: h0,
        Cc: b0,
        Cf: ke,
        P: Iu,
        S: Ee,
        Z: p0
    }, Symbol.toStringTag, {
        value: "Module"
    })),
    De = new Uint16Array('ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map(u => u.charCodeAt(0))),
    Ae = new Uint16Array("Ȁaglq	\x1Bɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢".split("").map(u => u.charCodeAt(0)));
var mu;
const ye = new Map([
        [0, 65533],
        [128, 8364],
        [130, 8218],
        [131, 402],
        [132, 8222],
        [133, 8230],
        [134, 8224],
        [135, 8225],
        [136, 710],
        [137, 8240],
        [138, 352],
        [139, 8249],
        [140, 338],
        [142, 381],
        [145, 8216],
        [146, 8217],
        [147, 8220],
        [148, 8221],
        [149, 8226],
        [150, 8211],
        [151, 8212],
        [152, 732],
        [153, 8482],
        [154, 353],
        [155, 8250],
        [156, 339],
        [158, 382],
        [159, 376]
    ]),
    Fe = (mu = String.fromCodePoint) !== null && mu !== void 0 ? mu : function(u) {
        let e = "";
        return u > 65535 && (u -= 65536, e += String.fromCharCode(u >>> 10 & 1023 | 55296), u = 56320 | u & 1023), e += String.fromCharCode(u), e
    };

function we(u) {
    var e;
    return u >= 55296 && u <= 57343 || u > 1114111 ? 65533 : (e = ye.get(u)) !== null && e !== void 0 ? e : u
}
var y;
(function(u) {
    u[u.NUM = 35] = "NUM", u[u.SEMI = 59] = "SEMI", u[u.EQUALS = 61] = "EQUALS", u[u.ZERO = 48] = "ZERO", u[u.NINE = 57] = "NINE", u[u.LOWER_A = 97] = "LOWER_A", u[u.LOWER_F = 102] = "LOWER_F", u[u.LOWER_X = 120] = "LOWER_X", u[u.LOWER_Z = 122] = "LOWER_Z", u[u.UPPER_A = 65] = "UPPER_A", u[u.UPPER_F = 70] = "UPPER_F", u[u.UPPER_Z = 90] = "UPPER_Z"
})(y || (y = {}));
const Se = 32;
var L;
(function(u) {
    u[u.VALUE_LENGTH = 49152] = "VALUE_LENGTH", u[u.BRANCH_LENGTH = 16256] = "BRANCH_LENGTH", u[u.JUMP_TABLE = 127] = "JUMP_TABLE"
})(L || (L = {}));

function yu(u) {
    return u >= y.ZERO && u <= y.NINE
}

function ve(u) {
    return u >= y.UPPER_A && u <= y.UPPER_F || u >= y.LOWER_A && u <= y.LOWER_F
}

function Te(u) {
    return u >= y.UPPER_A && u <= y.UPPER_Z || u >= y.LOWER_A && u <= y.LOWER_Z || yu(u)
}

function Ie(u) {
    return u === y.EQUALS || Te(u)
}
var A;
(function(u) {
    u[u.EntityStart = 0] = "EntityStart", u[u.NumericStart = 1] = "NumericStart", u[u.NumericDecimal = 2] = "NumericDecimal", u[u.NumericHex = 3] = "NumericHex", u[u.NamedEntity = 4] = "NamedEntity"
})(A || (A = {}));
var N;
(function(u) {
    u[u.Legacy = 0] = "Legacy", u[u.Strict = 1] = "Strict", u[u.Attribute = 2] = "Attribute"
})(N || (N = {}));
class Re {
    constructor(e, t, n) {
        this.decodeTree = e, this.emitCodePoint = t, this.errors = n, this.state = A.EntityStart, this.consumed = 1, this.result = 0, this.treeIndex = 0, this.excess = 1, this.decodeMode = N.Strict
    }
    startEntity(e) {
        this.decodeMode = e, this.state = A.EntityStart, this.result = 0, this.treeIndex = 0, this.excess = 1, this.consumed = 1
    }
    write(e, t) {
        switch (this.state) {
            case A.EntityStart:
                return e.charCodeAt(t) === y.NUM ? (this.state = A.NumericStart, this.consumed += 1, this.stateNumericStart(e, t + 1)) : (this.state = A.NamedEntity, this.stateNamedEntity(e, t));
            case A.NumericStart:
                return this.stateNumericStart(e, t);
            case A.NumericDecimal:
                return this.stateNumericDecimal(e, t);
            case A.NumericHex:
                return this.stateNumericHex(e, t);
            case A.NamedEntity:
                return this.stateNamedEntity(e, t)
        }
    }
    stateNumericStart(e, t) {
        return t >= e.length ? -1 : (e.charCodeAt(t) | Se) === y.LOWER_X ? (this.state = A.NumericHex, this.consumed += 1, this.stateNumericHex(e, t + 1)) : (this.state = A.NumericDecimal, this.stateNumericDecimal(e, t))
    }
    addToNumericResult(e, t, n, c) {
        if (t !== n) {
            const r = n - t;
            this.result = this.result * Math.pow(c, r) + parseInt(e.substr(t, r), c), this.consumed += r
        }
    }
    stateNumericHex(e, t) {
        const n = t;
        for (; t < e.length;) {
            const c = e.charCodeAt(t);
            if (yu(c) || ve(c)) t += 1;
            else return this.addToNumericResult(e, n, t, 16), this.emitNumericEntity(c, 3)
        }
        return this.addToNumericResult(e, n, t, 16), -1
    }
    stateNumericDecimal(e, t) {
        const n = t;
        for (; t < e.length;) {
            const c = e.charCodeAt(t);
            if (yu(c)) t += 1;
            else return this.addToNumericResult(e, n, t, 10), this.emitNumericEntity(c, 2)
        }
        return this.addToNumericResult(e, n, t, 10), -1
    }
    emitNumericEntity(e, t) {
        var n;
        if (this.consumed <= t) return (n = this.errors) === null || n === void 0 || n.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
        if (e === y.SEMI) this.consumed += 1;
        else if (this.decodeMode === N.Strict) return 0;
        return this.emitCodePoint(we(this.result), this.consumed), this.errors && (e !== y.SEMI && this.errors.missingSemicolonAfterCharacterReference(), this.errors.validateNumericCharacterReference(this.result)), this.consumed
    }
    stateNamedEntity(e, t) {
        const {
            decodeTree: n
        } = this;
        let c = n[this.treeIndex],
            r = (c & L.VALUE_LENGTH) >> 14;
        for (; t < e.length; t++, this.excess++) {
            const o = e.charCodeAt(t);
            if (this.treeIndex = Oe(n, c, this.treeIndex + Math.max(1, r), o), this.treeIndex < 0) return this.result === 0 || this.decodeMode === N.Attribute && (r === 0 || Ie(o)) ? 0 : this.emitNotTerminatedNamedEntity();
            if (c = n[this.treeIndex], r = (c & L.VALUE_LENGTH) >> 14, r !== 0) {
                if (o === y.SEMI) return this.emitNamedEntityData(this.treeIndex, r, this.consumed + this.excess);
                this.decodeMode !== N.Strict && (this.result = this.treeIndex, this.consumed += this.excess, this.excess = 0)
            }
        }
        return -1
    }
    emitNotTerminatedNamedEntity() {
        var e;
        const {
            result: t,
            decodeTree: n
        } = this, c = (n[t] & L.VALUE_LENGTH) >> 14;
        return this.emitNamedEntityData(t, c, this.consumed), (e = this.errors) === null || e === void 0 || e.missingSemicolonAfterCharacterReference(), this.consumed
    }
    emitNamedEntityData(e, t, n) {
        const {
            decodeTree: c
        } = this;
        return this.emitCodePoint(t === 1 ? c[e] & ~L.VALUE_LENGTH : c[e + 1], n), t === 3 && this.emitCodePoint(c[e + 2], n), n
    }
    end() {
        var e;
        switch (this.state) {
            case A.NamedEntity:
                return this.result !== 0 && (this.decodeMode !== N.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
            case A.NumericDecimal:
                return this.emitNumericEntity(0, 2);
            case A.NumericHex:
                return this.emitNumericEntity(0, 3);
            case A.NumericStart:
                return (e = this.errors) === null || e === void 0 || e.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
            case A.EntityStart:
                return 0
        }
    }
}

function x0(u) {
    let e = "";
    const t = new Re(u, n => e += Fe(n));
    return function(c, r) {
        let o = 0,
            i = 0;
        for (;
            (i = c.indexOf("&", i)) >= 0;) {
            e += c.slice(o, i), t.startEntity(r);
            const s = t.write(c, i + 1);
            if (s < 0) {
                o = i + t.end();
                break
            }
            o = i + s, i = s === 0 ? o + 1 : o
        }
        const a = e + c.slice(o);
        return e = "", a
    }
}

function Oe(u, e, t, n) {
    const c = (e & L.BRANCH_LENGTH) >> 7,
        r = e & L.JUMP_TABLE;
    if (c === 0) return r !== 0 && n === r ? t : -1;
    if (r) {
        const a = n - r;
        return a < 0 || a >= c ? -1 : u[t + a] - 1
    }
    let o = t,
        i = o + c - 1;
    for (; o <= i;) {
        const a = o + i >>> 1,
            s = u[a];
        if (s < n) o = a + 1;
        else if (s > n) i = a - 1;
        else return u[a + c]
    }
    return -1
}
const Be = x0(De);
x0(Ae);

function _0(u, e = N.Legacy) {
    return Be(u, e)
}

function Me(u) {
    return Object.prototype.toString.call(u)
}

function Ru(u) {
    return Me(u) === "[object String]"
}
const Ne = Object.prototype.hasOwnProperty;

function Le(u, e) {
    return Ne.call(u, e)
}

function hu(u) {
    return Array.prototype.slice.call(arguments, 1).forEach(function(t) {
        if (t) {
            if (typeof t != "object") throw new TypeError(t + "must be object");
            Object.keys(t).forEach(function(n) {
                u[n] = t[n]
            })
        }
    }), u
}

function m0(u, e, t) {
    return [].concat(u.slice(0, e), t, u.slice(e + 1))
}

function Ou(u) {
    return !(u >= 55296 && u <= 57343 || u >= 64976 && u <= 65007 || (u & 65535) === 65535 || (u & 65535) === 65534 || u >= 0 && u <= 8 || u === 11 || u >= 14 && u <= 31 || u >= 127 && u <= 159 || u > 1114111)
}

function lu(u) {
    if (u > 65535) {
        u -= 65536;
        const e = 55296 + (u >> 10),
            t = 56320 + (u & 1023);
        return String.fromCharCode(e, t)
    }
    return String.fromCharCode(u)
}
const g0 = /\\([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/g,
    qe = /&([a-z#][a-z0-9]{1,31});/gi,
    ze = new RegExp(g0.source + "|" + qe.source, "gi"),
    Pe = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))$/i;

function $e(u, e) {
    if (e.charCodeAt(0) === 35 && Pe.test(e)) {
        const n = e[1].toLowerCase() === "x" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
        return Ou(n) ? lu(n) : u
    }
    const t = _0(u);
    return t !== u ? t : u
}

function je(u) {
    return u.indexOf("\\") < 0 ? u : u.replace(g0, "$1")
}

function Y(u) {
    return u.indexOf("\\") < 0 && u.indexOf("&") < 0 ? u : u.replace(ze, function(e, t, n) {
        return t || $e(e, n)
    })
}
const He = /[&<>"]/,
    Ue = /[&<>"]/g,
    Ge = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;"
    };

function Ze(u) {
    return Ge[u]
}

function q(u) {
    return He.test(u) ? u.replace(Ue, Ze) : u
}
const Ve = /[.?*+^$[\]\\(){}|-]/g;

function Ke(u) {
    return u.replace(Ve, "\\$&")
}

function C(u) {
    switch (u) {
        case 9:
        case 32:
            return !0
    }
    return !1
}

function J(u) {
    if (u >= 8192 && u <= 8202) return !0;
    switch (u) {
        case 9:
        case 10:
        case 11:
        case 12:
        case 13:
        case 32:
        case 160:
        case 5760:
        case 8239:
        case 8287:
        case 12288:
            return !0
    }
    return !1
}

function Q(u) {
    return Iu.test(u)
}

function X(u) {
    switch (u) {
        case 33:
        case 34:
        case 35:
        case 36:
        case 37:
        case 38:
        case 39:
        case 40:
        case 41:
        case 42:
        case 43:
        case 44:
        case 45:
        case 46:
        case 47:
        case 58:
        case 59:
        case 60:
        case 61:
        case 62:
        case 63:
        case 64:
        case 91:
        case 92:
        case 93:
        case 94:
        case 95:
        case 96:
        case 123:
        case 124:
        case 125:
        case 126:
            return !0;
        default:
            return !1
    }
}

function bu(u) {
    return u = u.trim().replace(/\s+/g, " "), "ẞ".toLowerCase() === "Ṿ" && (u = u.replace(/ẞ/g, "ß")), u.toLowerCase().toUpperCase()
}
const We = {
        mdurl: ge,
        ucmicro: Ce
    },
    Ye = Object.freeze(Object.defineProperty({
        __proto__: null,
        arrayReplaceAt: m0,
        assign: hu,
        escapeHtml: q,
        escapeRE: Ke,
        fromCodePoint: lu,
        has: Le,
        isMdAsciiPunct: X,
        isPunctChar: Q,
        isSpace: C,
        isString: Ru,
        isValidEntityCode: Ou,
        isWhiteSpace: J,
        lib: We,
        normalizeReference: bu,
        unescapeAll: Y,
        unescapeMd: je
    }, Symbol.toStringTag, {
        value: "Module"
    }));

function Je(u, e, t) {
    let n, c, r, o;
    const i = u.posMax,
        a = u.pos;
    for (u.pos = e + 1, n = 1; u.pos < i;) {
        if (r = u.src.charCodeAt(u.pos), r === 93 && (n--, n === 0)) {
            c = !0;
            break
        }
        if (o = u.pos, u.md.inline.skipToken(u), r === 91) {
            if (o === u.pos - 1) n++;
            else if (t) return u.pos = a, -1
        }
    }
    let s = -1;
    return c && (s = u.pos), u.pos = a, s
}

function Qe(u, e, t) {
    let n, c = e;
    const r = {
        ok: !1,
        pos: 0,
        lines: 0,
        str: ""
    };
    if (u.charCodeAt(c) === 60) {
        for (c++; c < t;) {
            if (n = u.charCodeAt(c), n === 10 || n === 60) return r;
            if (n === 62) return r.pos = c + 1, r.str = Y(u.slice(e + 1, c)), r.ok = !0, r;
            if (n === 92 && c + 1 < t) {
                c += 2;
                continue
            }
            c++
        }
        return r
    }
    let o = 0;
    for (; c < t && (n = u.charCodeAt(c), !(n === 32 || n < 32 || n === 127));) {
        if (n === 92 && c + 1 < t) {
            if (u.charCodeAt(c + 1) === 32) break;
            c += 2;
            continue
        }
        if (n === 40 && (o++, o > 32)) return r;
        if (n === 41) {
            if (o === 0) break;
            o--
        }
        c++
    }
    return e === c || o !== 0 || (r.str = Y(u.slice(e, c)), r.pos = c, r.ok = !0), r
}

function Xe(u, e, t) {
    let n, c, r = 0,
        o = e;
    const i = {
        ok: !1,
        pos: 0,
        lines: 0,
        str: ""
    };
    if (o >= t || (c = u.charCodeAt(o), c !== 34 && c !== 39 && c !== 40)) return i;
    for (o++, c === 40 && (c = 41); o < t;) {
        if (n = u.charCodeAt(o), n === c) return i.pos = o + 1, i.lines = r, i.str = Y(u.slice(e + 1, o)), i.ok = !0, i;
        if (n === 40 && c === 41) return i;
        n === 10 ? r++ : n === 92 && o + 1 < t && (o++, u.charCodeAt(o) === 10 && r++), o++
    }
    return i
}
const ut = Object.freeze(Object.defineProperty({
        __proto__: null,
        parseLinkDestination: Qe,
        parseLinkLabel: Je,
        parseLinkTitle: Xe
    }, Symbol.toStringTag, {
        value: "Module"
    })),
    O = {};
O.code_inline = function(u, e, t, n, c) {
    const r = u[e];
    return "<code" + c.renderAttrs(r) + ">" + q(r.content) + "</code>"
};
O.code_block = function(u, e, t, n, c) {
    const r = u[e];
    return "<pre" + c.renderAttrs(r) + "><code>" + q(u[e].content) + `</code></pre>
`
};
O.fence = function(u, e, t, n, c) {
    const r = u[e],
        o = r.info ? Y(r.info).trim() : "";
    let i = "",
        a = "";
    if (o) {
        const d = o.split(/(\s+)/g);
        i = d[0], a = d.slice(2).join("")
    }
    let s;
    if (t.highlight ? s = t.highlight(r.content, i, a) || q(r.content) : s = q(r.content), s.indexOf("<pre") === 0) return s + `
`;
    if (o) {
        const d = r.attrIndex("class"),
            f = r.attrs ? r.attrs.slice() : [];
        d < 0 ? f.push(["class", t.langPrefix + i]) : (f[d] = f[d].slice(), f[d][1] += " " + t.langPrefix + i);
        const b = {
            attrs: f
        };
        return `<pre><code${c.renderAttrs(b)}>${s}</code></pre>
`
    }
    return `<pre><code${c.renderAttrs(r)}>${s}</code></pre>
`
};
O.image = function(u, e, t, n, c) {
    const r = u[e];
    return r.attrs[r.attrIndex("alt")][1] = c.renderInlineAsText(r.children, t, n), c.renderToken(u, e, t)
};
O.hardbreak = function(u, e, t) {
    return t.xhtmlOut ? `<br />
` : `<br>
`
};
O.softbreak = function(u, e, t) {
    return t.breaks ? t.xhtmlOut ? `<br />
` : `<br>
` : `
`
};
O.text = function(u, e) {
    return q(u[e].content)
};
O.html_block = function(u, e) {
    return u[e].content
};
O.html_inline = function(u, e) {
    return u[e].content
};

function G() {
    this.rules = hu({}, O)
}
G.prototype.renderAttrs = function(e) {
    let t, n, c;
    if (!e.attrs) return "";
    for (c = "", t = 0, n = e.attrs.length; t < n; t++) c += " " + q(e.attrs[t][0]) + '="' + q(e.attrs[t][1]) + '"';
    return c
};
G.prototype.renderToken = function(e, t, n) {
    const c = e[t];
    let r = "";
    if (c.hidden) return "";
    c.block && c.nesting !== -1 && t && e[t - 1].hidden && (r += `
`), r += (c.nesting === -1 ? "</" : "<") + c.tag, r += this.renderAttrs(c), c.nesting === 0 && n.xhtmlOut && (r += " /");
    let o = !1;
    if (c.block && (o = !0, c.nesting === 1 && t + 1 < e.length)) {
        const i = e[t + 1];
        (i.type === "inline" || i.hidden || i.nesting === -1 && i.tag === c.tag) && (o = !1)
    }
    return r += o ? `>
` : ">", r
};
G.prototype.renderInline = function(u, e, t) {
    let n = "";
    const c = this.rules;
    for (let r = 0, o = u.length; r < o; r++) {
        const i = u[r].type;
        typeof c[i] < "u" ? n += c[i](u, r, e, t, this) : n += this.renderToken(u, r, e)
    }
    return n
};
G.prototype.renderInlineAsText = function(u, e, t) {
    let n = "";
    for (let c = 0, r = u.length; c < r; c++) switch (u[c].type) {
        case "text":
            n += u[c].content;
            break;
        case "image":
            n += this.renderInlineAsText(u[c].children, e, t);
            break;
        case "html_inline":
        case "html_block":
            n += u[c].content;
            break;
        case "softbreak":
        case "hardbreak":
            n += `
`;
            break
    }
    return n
};
G.prototype.render = function(u, e, t) {
    let n = "";
    const c = this.rules;
    for (let r = 0, o = u.length; r < o; r++) {
        const i = u[r].type;
        i === "inline" ? n += this.renderInline(u[r].children, e, t) : typeof c[i] < "u" ? n += c[i](u, r, e, t, this) : n += this.renderToken(u, r, e, t)
    }
    return n
};

function w() {
    this.__rules__ = [], this.__cache__ = null
}
w.prototype.__find__ = function(u) {
    for (let e = 0; e < this.__rules__.length; e++)
        if (this.__rules__[e].name === u) return e;
    return -1
};
w.prototype.__compile__ = function() {
    const u = this,
        e = [""];
    u.__rules__.forEach(function(t) {
        t.enabled && t.alt.forEach(function(n) {
            e.indexOf(n) < 0 && e.push(n)
        })
    }), u.__cache__ = {}, e.forEach(function(t) {
        u.__cache__[t] = [], u.__rules__.forEach(function(n) {
            n.enabled && (t && n.alt.indexOf(t) < 0 || u.__cache__[t].push(n.fn))
        })
    })
};
w.prototype.at = function(u, e, t) {
    const n = this.__find__(u),
        c = t || {};
    if (n === -1) throw new Error("Parser rule not found: " + u);
    this.__rules__[n].fn = e, this.__rules__[n].alt = c.alt || [], this.__cache__ = null
};
w.prototype.before = function(u, e, t, n) {
    const c = this.__find__(u),
        r = n || {};
    if (c === -1) throw new Error("Parser rule not found: " + u);
    this.__rules__.splice(c, 0, {
        name: e,
        enabled: !0,
        fn: t,
        alt: r.alt || []
    }), this.__cache__ = null
};
w.prototype.after = function(u, e, t, n) {
    const c = this.__find__(u),
        r = n || {};
    if (c === -1) throw new Error("Parser rule not found: " + u);
    this.__rules__.splice(c + 1, 0, {
        name: e,
        enabled: !0,
        fn: t,
        alt: r.alt || []
    }), this.__cache__ = null
};
w.prototype.push = function(u, e, t) {
    const n = t || {};
    this.__rules__.push({
        name: u,
        enabled: !0,
        fn: e,
        alt: n.alt || []
    }), this.__cache__ = null
};
w.prototype.enable = function(u, e) {
    Array.isArray(u) || (u = [u]);
    const t = [];
    return u.forEach(function(n) {
        const c = this.__find__(n);
        if (c < 0) {
            if (e) return;
            throw new Error("Rules manager: invalid rule name " + n)
        }
        this.__rules__[c].enabled = !0, t.push(n)
    }, this), this.__cache__ = null, t
};
w.prototype.enableOnly = function(u, e) {
    Array.isArray(u) || (u = [u]), this.__rules__.forEach(function(t) {
        t.enabled = !1
    }), this.enable(u, e)
};
w.prototype.disable = function(u, e) {
    Array.isArray(u) || (u = [u]);
    const t = [];
    return u.forEach(function(n) {
        const c = this.__find__(n);
        if (c < 0) {
            if (e) return;
            throw new Error("Rules manager: invalid rule name " + n)
        }
        this.__rules__[c].enabled = !1, t.push(n)
    }, this), this.__cache__ = null, t
};
w.prototype.getRules = function(u) {
    return this.__cache__ === null && this.__compile__(), this.__cache__[u] || []
};

function T(u, e, t) {
    this.type = u, this.tag = e, this.attrs = null, this.map = null, this.nesting = t, this.level = 0, this.children = null, this.content = "", this.markup = "", this.info = "", this.meta = null, this.block = !1, this.hidden = !1
}
T.prototype.attrIndex = function(e) {
    if (!this.attrs) return -1;
    const t = this.attrs;
    for (let n = 0, c = t.length; n < c; n++)
        if (t[n][0] === e) return n;
    return -1
};
T.prototype.attrPush = function(e) {
    this.attrs ? this.attrs.push(e) : this.attrs = [e]
};
T.prototype.attrSet = function(e, t) {
    const n = this.attrIndex(e),
        c = [e, t];
    n < 0 ? this.attrPush(c) : this.attrs[n] = c
};
T.prototype.attrGet = function(e) {
    const t = this.attrIndex(e);
    let n = null;
    return t >= 0 && (n = this.attrs[t][1]), n
};
T.prototype.attrJoin = function(e, t) {
    const n = this.attrIndex(e);
    n < 0 ? this.attrPush([e, t]) : this.attrs[n][1] = this.attrs[n][1] + " " + t
};

function k0(u, e, t) {
    this.src = u, this.env = t, this.tokens = [], this.inlineMode = !1, this.md = e
}
k0.prototype.Token = T;
const et = /\r\n?|\n/g,
    tt = /\0/g;

function nt(u) {
    let e;
    e = u.src.replace(et, `
`), e = e.replace(tt, "�"), u.src = e
}

function rt(u) {
    let e;
    u.inlineMode ? (e = new u.Token("inline", "", 0), e.content = u.src, e.map = [0, 1], e.children = [], u.tokens.push(e)) : u.md.block.parse(u.src, u.md, u.env, u.tokens)
}

function ct(u) {
    const e = u.tokens;
    for (let t = 0, n = e.length; t < n; t++) {
        const c = e[t];
        c.type === "inline" && u.md.inline.parse(c.content, u.md, u.env, c.children)
    }
}

function it(u) {
    return /^<a[>\s]/i.test(u)
}

function ot(u) {
    return /^<\/a\s*>/i.test(u)
}

function at(u) {
    const e = u.tokens;
    if (u.md.options.linkify)
        for (let t = 0, n = e.length; t < n; t++) {
            if (e[t].type !== "inline" || !u.md.linkify.pretest(e[t].content)) continue;
            let c = e[t].children,
                r = 0;
            for (let o = c.length - 1; o >= 0; o--) {
                const i = c[o];
                if (i.type === "link_close") {
                    for (o--; c[o].level !== i.level && c[o].type !== "link_open";) o--;
                    continue
                }
                if (i.type === "html_inline" && (it(i.content) && r > 0 && r--, ot(i.content) && r++), !(r > 0) && i.type === "text" && u.md.linkify.test(i.content)) {
                    const a = i.content;
                    let s = u.md.linkify.match(a);
                    const d = [];
                    let f = i.level,
                        b = 0;
                    s.length > 0 && s[0].index === 0 && o > 0 && c[o - 1].type === "text_special" && (s = s.slice(1));
                    for (let h = 0; h < s.length; h++) {
                        const l = s[h].url,
                            m = u.md.normalizeLink(l);
                        if (!u.md.validateLink(m)) continue;
                        let g = s[h].text;
                        s[h].schema ? s[h].schema === "mailto:" && !/^mailto:/i.test(g) ? g = u.md.normalizeLinkText("mailto:" + g).replace(/^mailto:/, "") : g = u.md.normalizeLinkText(g) : g = u.md.normalizeLinkText("http://" + g).replace(/^http:\/\//, "");
                        const k = s[h].index;
                        if (k > b) {
                            const p = new u.Token("text", "", 0);
                            p.content = a.slice(b, k), p.level = f, d.push(p)
                        }
                        const E = new u.Token("link_open", "a", 1);
                        E.attrs = [
                            ["href", m]
                        ], E.level = f++, E.markup = "linkify", E.info = "auto", d.push(E);
                        const x = new u.Token("text", "", 0);
                        x.content = g, x.level = f, d.push(x);
                        const _ = new u.Token("link_close", "a", -1);
                        _.level = --f, _.markup = "linkify", _.info = "auto", d.push(_), b = s[h].lastIndex
                    }
                    if (b < a.length) {
                        const h = new u.Token("text", "", 0);
                        h.content = a.slice(b), h.level = f, d.push(h)
                    }
                    e[t].children = c = m0(c, o, d)
                }
            }
        }
}
const E0 = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/,
    st = /\((c|tm|r)\)/i,
    ft = /\((c|tm|r)\)/ig,
    lt = {
        c: "©",
        r: "®",
        tm: "™"
    };

function dt(u, e) {
    return lt[e.toLowerCase()]
}

function ht(u) {
    let e = 0;
    for (let t = u.length - 1; t >= 0; t--) {
        const n = u[t];
        n.type === "text" && !e && (n.content = n.content.replace(ft, dt)), n.type === "link_open" && n.info === "auto" && e--, n.type === "link_close" && n.info === "auto" && e++
    }
}

function bt(u) {
    let e = 0;
    for (let t = u.length - 1; t >= 0; t--) {
        const n = u[t];
        n.type === "text" && !e && E0.test(n.content) && (n.content = n.content.replace(/\+-/g, "±").replace(/\.{2,}/g, "…").replace(/([?!])…/g, "$1..").replace(/([?!]){4,}/g, "$1$1$1").replace(/,{2,}/g, ",").replace(/(^|[^-])---(?=[^-]|$)/mg, "$1—").replace(/(^|\s)--(?=\s|$)/mg, "$1–").replace(/(^|[^-\s])--(?=[^-\s]|$)/mg, "$1–")), n.type === "link_open" && n.info === "auto" && e--, n.type === "link_close" && n.info === "auto" && e++
    }
}

function pt(u) {
    let e;
    if (u.md.options.typographer)
        for (e = u.tokens.length - 1; e >= 0; e--) u.tokens[e].type === "inline" && (st.test(u.tokens[e].content) && ht(u.tokens[e].children), E0.test(u.tokens[e].content) && bt(u.tokens[e].children))
}
const xt = /['"]/,
    Xu = /['"]/g,
    u0 = "’";

function iu(u, e, t) {
    return u.slice(0, e) + t + u.slice(e + 1)
}

function _t(u, e) {
    let t;
    const n = [];
    for (let c = 0; c < u.length; c++) {
        const r = u[c],
            o = u[c].level;
        for (t = n.length - 1; t >= 0 && !(n[t].level <= o); t--);
        if (n.length = t + 1, r.type !== "text") continue;
        let i = r.content,
            a = 0,
            s = i.length;
        u: for (; a < s;) {
            Xu.lastIndex = a;
            const d = Xu.exec(i);
            if (!d) break;
            let f = !0,
                b = !0;
            a = d.index + 1;
            const h = d[0] === "'";
            let l = 32;
            if (d.index - 1 >= 0) l = i.charCodeAt(d.index - 1);
            else
                for (t = c - 1; t >= 0 && !(u[t].type === "softbreak" || u[t].type === "hardbreak"); t--)
                    if (u[t].content) {
                        l = u[t].content.charCodeAt(u[t].content.length - 1);
                        break
                    } let m = 32;
            if (a < s) m = i.charCodeAt(a);
            else
                for (t = c + 1; t < u.length && !(u[t].type === "softbreak" || u[t].type === "hardbreak"); t++)
                    if (u[t].content) {
                        m = u[t].content.charCodeAt(0);
                        break
                    } const g = X(l) || Q(String.fromCharCode(l)),
                k = X(m) || Q(String.fromCharCode(m)),
                E = J(l),
                x = J(m);
            if (x ? f = !1 : k && (E || g || (f = !1)), E ? b = !1 : g && (x || k || (b = !1)), m === 34 && d[0] === '"' && l >= 48 && l <= 57 && (b = f = !1), f && b && (f = g, b = k), !f && !b) {
                h && (r.content = iu(r.content, d.index, u0));
                continue
            }
            if (b)
                for (t = n.length - 1; t >= 0; t--) {
                    let _ = n[t];
                    if (n[t].level < o) break;
                    if (_.single === h && n[t].level === o) {
                        _ = n[t];
                        let p, D;
                        h ? (p = e.md.options.quotes[2], D = e.md.options.quotes[3]) : (p = e.md.options.quotes[0], D = e.md.options.quotes[1]), r.content = iu(r.content, d.index, D), u[_.token].content = iu(u[_.token].content, _.pos, p), a += D.length - 1, _.token === c && (a += p.length - 1), i = r.content, s = i.length, n.length = t;
                        continue u
                    }
                }
            f ? n.push({
                token: c,
                pos: d.index,
                single: h,
                level: o
            }) : b && h && (r.content = iu(r.content, d.index, u0))
        }
    }
}

function mt(u) {
    if (u.md.options.typographer)
        for (let e = u.tokens.length - 1; e >= 0; e--) u.tokens[e].type !== "inline" || !xt.test(u.tokens[e].content) || _t(u.tokens[e].children, u)
}

function gt(u) {
    let e, t;
    const n = u.tokens,
        c = n.length;
    for (let r = 0; r < c; r++) {
        if (n[r].type !== "inline") continue;
        const o = n[r].children,
            i = o.length;
        for (e = 0; e < i; e++) o[e].type === "text_special" && (o[e].type = "text");
        for (e = t = 0; e < i; e++) o[e].type === "text" && e + 1 < i && o[e + 1].type === "text" ? o[e + 1].content = o[e].content + o[e + 1].content : (e !== t && (o[t] = o[e]), t++);
        e !== t && (o.length = t)
    }
}
const gu = [
    ["normalize", nt],
    ["block", rt],
    ["inline", ct],
    ["linkify", at],
    ["replacements", pt],
    ["smartquotes", mt],
    ["text_join", gt]
];

function Bu() {
    this.ruler = new w;
    for (let u = 0; u < gu.length; u++) this.ruler.push(gu[u][0], gu[u][1])
}
Bu.prototype.process = function(u) {
    const e = this.ruler.getRules("");
    for (let t = 0, n = e.length; t < n; t++) e[t](u)
};
Bu.prototype.State = k0;

function B(u, e, t, n) {
    this.src = u, this.md = e, this.env = t, this.tokens = n, this.bMarks = [], this.eMarks = [], this.tShift = [], this.sCount = [], this.bsCount = [], this.blkIndent = 0, this.line = 0, this.lineMax = 0, this.tight = !1, this.ddIndent = -1, this.listIndent = -1, this.parentType = "root", this.level = 0;
    const c = this.src;
    for (let r = 0, o = 0, i = 0, a = 0, s = c.length, d = !1; o < s; o++) {
        const f = c.charCodeAt(o);
        if (!d)
            if (C(f)) {
                i++, f === 9 ? a += 4 - a % 4 : a++;
                continue
            } else d = !0;
        (f === 10 || o === s - 1) && (f !== 10 && o++, this.bMarks.push(r), this.eMarks.push(o), this.tShift.push(i), this.sCount.push(a), this.bsCount.push(0), d = !1, i = 0, a = 0, r = o + 1)
    }
    this.bMarks.push(c.length), this.eMarks.push(c.length), this.tShift.push(0), this.sCount.push(0), this.bsCount.push(0), this.lineMax = this.bMarks.length - 1
}
B.prototype.push = function(u, e, t) {
    const n = new T(u, e, t);
    return n.block = !0, t < 0 && this.level--, n.level = this.level, t > 0 && this.level++, this.tokens.push(n), n
};
B.prototype.isEmpty = function(e) {
    return this.bMarks[e] + this.tShift[e] >= this.eMarks[e]
};
B.prototype.skipEmptyLines = function(e) {
    for (let t = this.lineMax; e < t && !(this.bMarks[e] + this.tShift[e] < this.eMarks[e]); e++);
    return e
};
B.prototype.skipSpaces = function(e) {
    for (let t = this.src.length; e < t; e++) {
        const n = this.src.charCodeAt(e);
        if (!C(n)) break
    }
    return e
};
B.prototype.skipSpacesBack = function(e, t) {
    if (e <= t) return e;
    for (; e > t;)
        if (!C(this.src.charCodeAt(--e))) return e + 1;
    return e
};
B.prototype.skipChars = function(e, t) {
    for (let n = this.src.length; e < n && this.src.charCodeAt(e) === t; e++);
    return e
};
B.prototype.skipCharsBack = function(e, t, n) {
    if (e <= n) return e;
    for (; e > n;)
        if (t !== this.src.charCodeAt(--e)) return e + 1;
    return e
};
B.prototype.getLines = function(e, t, n, c) {
    if (e >= t) return "";
    const r = new Array(t - e);
    for (let o = 0, i = e; i < t; i++, o++) {
        let a = 0;
        const s = this.bMarks[i];
        let d = s,
            f;
        for (i + 1 < t || c ? f = this.eMarks[i] + 1 : f = this.eMarks[i]; d < f && a < n;) {
            const b = this.src.charCodeAt(d);
            if (C(b)) b === 9 ? a += 4 - (a + this.bsCount[i]) % 4 : a++;
            else if (d - s < this.tShift[i]) a++;
            else break;
            d++
        }
        a > n ? r[o] = new Array(a - n + 1).join(" ") + this.src.slice(d, f) : r[o] = this.src.slice(d, f)
    }
    return r.join("")
};
B.prototype.Token = T;

function ku(u, e) {
    const t = u.bMarks[e] + u.tShift[e],
        n = u.eMarks[e];
    return u.src.slice(t, n)
}

function e0(u) {
    const e = [],
        t = u.length;
    let n = 0,
        c = u.charCodeAt(n),
        r = !1,
        o = 0,
        i = "";
    for (; n < t;) c === 124 && (r ? (i += u.substring(o, n - 1), o = n) : (e.push(i + u.substring(o, n)), i = "", o = n + 1)), r = c === 92, n++, c = u.charCodeAt(n);
    return e.push(i + u.substring(o)), e
}

function kt(u, e, t, n) {
    if (e + 2 > t) return !1;
    let c = e + 1;
    if (u.sCount[c] < u.blkIndent || u.sCount[c] - u.blkIndent >= 4) return !1;
    let r = u.bMarks[c] + u.tShift[c];
    if (r >= u.eMarks[c]) return !1;
    const o = u.src.charCodeAt(r++);
    if (o !== 124 && o !== 45 && o !== 58 || r >= u.eMarks[c]) return !1;
    const i = u.src.charCodeAt(r++);
    if (i !== 124 && i !== 45 && i !== 58 && !C(i) || o === 45 && C(i)) return !1;
    for (; r < u.eMarks[c];) {
        const x = u.src.charCodeAt(r);
        if (x !== 124 && x !== 45 && x !== 58 && !C(x)) return !1;
        r++
    }
    let a = ku(u, e + 1),
        s = a.split("|");
    const d = [];
    for (let x = 0; x < s.length; x++) {
        const _ = s[x].trim();
        if (!_) {
            if (x === 0 || x === s.length - 1) continue;
            return !1
        }
        if (!/^:?-+:?$/.test(_)) return !1;
        _.charCodeAt(_.length - 1) === 58 ? d.push(_.charCodeAt(0) === 58 ? "center" : "right") : _.charCodeAt(0) === 58 ? d.push("left") : d.push("")
    }
    if (a = ku(u, e).trim(), a.indexOf("|") === -1 || u.sCount[e] - u.blkIndent >= 4) return !1;
    s = e0(a), s.length && s[0] === "" && s.shift(), s.length && s[s.length - 1] === "" && s.pop();
    const f = s.length;
    if (f === 0 || f !== d.length) return !1;
    if (n) return !0;
    const b = u.parentType;
    u.parentType = "table";
    const h = u.md.block.ruler.getRules("blockquote"),
        l = u.push("table_open", "table", 1),
        m = [e, 0];
    l.map = m;
    const g = u.push("thead_open", "thead", 1);
    g.map = [e, e + 1];
    const k = u.push("tr_open", "tr", 1);
    k.map = [e, e + 1];
    for (let x = 0; x < s.length; x++) {
        const _ = u.push("th_open", "th", 1);
        d[x] && (_.attrs = [
            ["style", "text-align:" + d[x]]
        ]);
        const p = u.push("inline", "", 0);
        p.content = s[x].trim(), p.children = [], u.push("th_close", "th", -1)
    }
    u.push("tr_close", "tr", -1), u.push("thead_close", "thead", -1);
    let E;
    for (c = e + 2; c < t && !(u.sCount[c] < u.blkIndent); c++) {
        let x = !1;
        for (let p = 0, D = h.length; p < D; p++)
            if (h[p](u, c, t, !0)) {
                x = !0;
                break
            }
        if (x || (a = ku(u, c).trim(), !a) || u.sCount[c] - u.blkIndent >= 4) break;
        if (s = e0(a), s.length && s[0] === "" && s.shift(), s.length && s[s.length - 1] === "" && s.pop(), c === e + 2) {
            const p = u.push("tbody_open", "tbody", 1);
            p.map = E = [e + 2, 0]
        }
        const _ = u.push("tr_open", "tr", 1);
        _.map = [c, c + 1];
        for (let p = 0; p < f; p++) {
            const D = u.push("td_open", "td", 1);
            d[p] && (D.attrs = [
                ["style", "text-align:" + d[p]]
            ]);
            const F = u.push("inline", "", 0);
            F.content = s[p] ? s[p].trim() : "", F.children = [], u.push("td_close", "td", -1)
        }
        u.push("tr_close", "tr", -1)
    }
    return E && (u.push("tbody_close", "tbody", -1), E[1] = c), u.push("table_close", "table", -1), m[1] = c, u.parentType = b, u.line = c, !0
}

function Et(u, e, t) {
    if (u.sCount[e] - u.blkIndent < 4) return !1;
    let n = e + 1,
        c = n;
    for (; n < t;) {
        if (u.isEmpty(n)) {
            n++;
            continue
        }
        if (u.sCount[n] - u.blkIndent >= 4) {
            n++, c = n;
            continue
        }
        break
    }
    u.line = c;
    const r = u.push("code_block", "code", 0);
    return r.content = u.getLines(e, c, 4 + u.blkIndent, !1) + `
`, r.map = [e, u.line], !0
}

function Ct(u, e, t, n) {
    let c = u.bMarks[e] + u.tShift[e],
        r = u.eMarks[e];
    if (u.sCount[e] - u.blkIndent >= 4 || c + 3 > r) return !1;
    const o = u.src.charCodeAt(c);
    if (o !== 126 && o !== 96) return !1;
    let i = c;
    c = u.skipChars(c, o);
    let a = c - i;
    if (a < 3) return !1;
    const s = u.src.slice(i, c),
        d = u.src.slice(c, r);
    if (o === 96 && d.indexOf(String.fromCharCode(o)) >= 0) return !1;
    if (n) return !0;
    let f = e,
        b = !1;
    for (; f++, !(f >= t || (c = i = u.bMarks[f] + u.tShift[f], r = u.eMarks[f], c < r && u.sCount[f] < u.blkIndent));)
        if (u.src.charCodeAt(c) === o && !(u.sCount[f] - u.blkIndent >= 4) && (c = u.skipChars(c, o), !(c - i < a) && (c = u.skipSpaces(c), !(c < r)))) {
            b = !0;
            break
        }
    a = u.sCount[e], u.line = f + (b ? 1 : 0);
    const h = u.push("fence", "code", 0);
    return h.info = d, h.content = u.getLines(e + 1, f, a, !0), h.markup = s, h.map = [e, u.line], !0
}

function Dt(u, e, t, n) {
    let c = u.bMarks[e] + u.tShift[e],
        r = u.eMarks[e];
    const o = u.lineMax;
    if (u.sCount[e] - u.blkIndent >= 4 || u.src.charCodeAt(c) !== 62) return !1;
    if (n) return !0;
    const i = [],
        a = [],
        s = [],
        d = [],
        f = u.md.block.ruler.getRules("blockquote"),
        b = u.parentType;
    u.parentType = "blockquote";
    let h = !1,
        l;
    for (l = e; l < t; l++) {
        const x = u.sCount[l] < u.blkIndent;
        if (c = u.bMarks[l] + u.tShift[l], r = u.eMarks[l], c >= r) break;
        if (u.src.charCodeAt(c++) === 62 && !x) {
            let p = u.sCount[l] + 1,
                D, F;
            u.src.charCodeAt(c) === 32 ? (c++, p++, F = !1, D = !0) : u.src.charCodeAt(c) === 9 ? (D = !0, (u.bsCount[l] + p) % 4 === 3 ? (c++, p++, F = !1) : F = !0) : D = !1;
            let P = p;
            for (i.push(u.bMarks[l]), u.bMarks[l] = c; c < r;) {
                const Z = u.src.charCodeAt(c);
                if (C(Z)) Z === 9 ? P += 4 - (P + u.bsCount[l] + (F ? 1 : 0)) % 4 : P++;
                else break;
                c++
            }
            h = c >= r, a.push(u.bsCount[l]), u.bsCount[l] = u.sCount[l] + 1 + (D ? 1 : 0), s.push(u.sCount[l]), u.sCount[l] = P - p, d.push(u.tShift[l]), u.tShift[l] = c - u.bMarks[l];
            continue
        }
        if (h) break;
        let _ = !1;
        for (let p = 0, D = f.length; p < D; p++)
            if (f[p](u, l, t, !0)) {
                _ = !0;
                break
            }
        if (_) {
            u.lineMax = l, u.blkIndent !== 0 && (i.push(u.bMarks[l]), a.push(u.bsCount[l]), d.push(u.tShift[l]), s.push(u.sCount[l]), u.sCount[l] -= u.blkIndent);
            break
        }
        i.push(u.bMarks[l]), a.push(u.bsCount[l]), d.push(u.tShift[l]), s.push(u.sCount[l]), u.sCount[l] = -1
    }
    const m = u.blkIndent;
    u.blkIndent = 0;
    const g = u.push("blockquote_open", "blockquote", 1);
    g.markup = ">";
    const k = [e, 0];
    g.map = k, u.md.block.tokenize(u, e, l);
    const E = u.push("blockquote_close", "blockquote", -1);
    E.markup = ">", u.lineMax = o, u.parentType = b, k[1] = u.line;
    for (let x = 0; x < d.length; x++) u.bMarks[x + e] = i[x], u.tShift[x + e] = d[x], u.sCount[x + e] = s[x], u.bsCount[x + e] = a[x];
    return u.blkIndent = m, !0
}

function At(u, e, t, n) {
    const c = u.eMarks[e];
    if (u.sCount[e] - u.blkIndent >= 4) return !1;
    let r = u.bMarks[e] + u.tShift[e];
    const o = u.src.charCodeAt(r++);
    if (o !== 42 && o !== 45 && o !== 95) return !1;
    let i = 1;
    for (; r < c;) {
        const s = u.src.charCodeAt(r++);
        if (s !== o && !C(s)) return !1;
        s === o && i++
    }
    if (i < 3) return !1;
    if (n) return !0;
    u.line = e + 1;
    const a = u.push("hr", "hr", 0);
    return a.map = [e, u.line], a.markup = Array(i + 1).join(String.fromCharCode(o)), !0
}

function t0(u, e) {
    const t = u.eMarks[e];
    let n = u.bMarks[e] + u.tShift[e];
    const c = u.src.charCodeAt(n++);
    if (c !== 42 && c !== 45 && c !== 43) return -1;
    if (n < t) {
        const r = u.src.charCodeAt(n);
        if (!C(r)) return -1
    }
    return n
}

function n0(u, e) {
    const t = u.bMarks[e] + u.tShift[e],
        n = u.eMarks[e];
    let c = t;
    if (c + 1 >= n) return -1;
    let r = u.src.charCodeAt(c++);
    if (r < 48 || r > 57) return -1;
    for (;;) {
        if (c >= n) return -1;
        if (r = u.src.charCodeAt(c++), r >= 48 && r <= 57) {
            if (c - t >= 10) return -1;
            continue
        }
        if (r === 41 || r === 46) break;
        return -1
    }
    return c < n && (r = u.src.charCodeAt(c), !C(r)) ? -1 : c
}

function yt(u, e) {
    const t = u.level + 2;
    for (let n = e + 2, c = u.tokens.length - 2; n < c; n++) u.tokens[n].level === t && u.tokens[n].type === "paragraph_open" && (u.tokens[n + 2].hidden = !0, u.tokens[n].hidden = !0, n += 2)
}

function Ft(u, e, t, n) {
    let c, r, o, i, a = e,
        s = !0;
    if (u.sCount[a] - u.blkIndent >= 4 || u.listIndent >= 0 && u.sCount[a] - u.listIndent >= 4 && u.sCount[a] < u.blkIndent) return !1;
    let d = !1;
    n && u.parentType === "paragraph" && u.sCount[a] >= u.blkIndent && (d = !0);
    let f, b, h;
    if ((h = n0(u, a)) >= 0) {
        if (f = !0, o = u.bMarks[a] + u.tShift[a], b = Number(u.src.slice(o, h - 1)), d && b !== 1) return !1
    } else if ((h = t0(u, a)) >= 0) f = !1;
    else return !1;
    if (d && u.skipSpaces(h) >= u.eMarks[a]) return !1;
    if (n) return !0;
    const l = u.src.charCodeAt(h - 1),
        m = u.tokens.length;
    f ? (i = u.push("ordered_list_open", "ol", 1), b !== 1 && (i.attrs = [
        ["start", b]
    ])) : i = u.push("bullet_list_open", "ul", 1);
    const g = [a, 0];
    i.map = g, i.markup = String.fromCharCode(l);
    let k = !1;
    const E = u.md.block.ruler.getRules("list"),
        x = u.parentType;
    for (u.parentType = "list"; a < t;) {
        r = h, c = u.eMarks[a];
        const _ = u.sCount[a] + h - (u.bMarks[a] + u.tShift[a]);
        let p = _;
        for (; r < c;) {
            const $ = u.src.charCodeAt(r);
            if ($ === 9) p += 4 - (p + u.bsCount[a]) % 4;
            else if ($ === 32) p++;
            else break;
            r++
        }
        const D = r;
        let F;
        D >= c ? F = 1 : F = p - _, F > 4 && (F = 1);
        const P = _ + F;
        i = u.push("list_item_open", "li", 1), i.markup = String.fromCharCode(l);
        const Z = [a, 0];
        i.map = Z, f && (i.info = u.src.slice(o, h - 1));
        const L0 = u.tight,
            q0 = u.tShift[a],
            z0 = u.sCount[a],
            P0 = u.listIndent;
        if (u.listIndent = u.blkIndent, u.blkIndent = P, u.tight = !0, u.tShift[a] = D - u.bMarks[a], u.sCount[a] = p, D >= c && u.isEmpty(a + 1) ? u.line = Math.min(u.line + 2, t) : u.md.block.tokenize(u, a, t, !0), (!u.tight || k) && (s = !1), k = u.line - a > 1 && u.isEmpty(u.line - 1), u.blkIndent = u.listIndent, u.listIndent = P0, u.tShift[a] = q0, u.sCount[a] = z0, u.tight = L0, i = u.push("list_item_close", "li", -1), i.markup = String.fromCharCode(l), a = u.line, Z[1] = a, a >= t || u.sCount[a] < u.blkIndent || u.sCount[a] - u.blkIndent >= 4) break;
        let Lu = !1;
        for (let $ = 0, $0 = E.length; $ < $0; $++)
            if (E[$](u, a, t, !0)) {
                Lu = !0;
                break
            }
        if (Lu) break;
        if (f) {
            if (h = n0(u, a), h < 0) break;
            o = u.bMarks[a] + u.tShift[a]
        } else if (h = t0(u, a), h < 0) break;
        if (l !== u.src.charCodeAt(h - 1)) break
    }
    return f ? i = u.push("ordered_list_close", "ol", -1) : i = u.push("bullet_list_close", "ul", -1), i.markup = String.fromCharCode(l), g[1] = a, u.line = a, u.parentType = x, s && yt(u, m), !0
}

function wt(u, e, t, n) {
    let c = 0,
        r = u.bMarks[e] + u.tShift[e],
        o = u.eMarks[e],
        i = e + 1;
    if (u.sCount[e] - u.blkIndent >= 4 || u.src.charCodeAt(r) !== 91) return !1;
    for (; ++r < o;)
        if (u.src.charCodeAt(r) === 93 && u.src.charCodeAt(r - 1) !== 92) {
            if (r + 1 === o || u.src.charCodeAt(r + 1) !== 58) return !1;
            break
        }
    const a = u.lineMax,
        s = u.md.block.ruler.getRules("reference"),
        d = u.parentType;
    for (u.parentType = "reference"; i < a && !u.isEmpty(i); i++) {
        if (u.sCount[i] - u.blkIndent > 3 || u.sCount[i] < 0) continue;
        let p = !1;
        for (let D = 0, F = s.length; D < F; D++)
            if (s[D](u, i, a, !0)) {
                p = !0;
                break
            }
        if (p) break
    }
    const f = u.getLines(e, i, u.blkIndent, !1).trim();
    o = f.length;
    let b = -1;
    for (r = 1; r < o; r++) {
        const p = f.charCodeAt(r);
        if (p === 91) return !1;
        if (p === 93) {
            b = r;
            break
        } else p === 10 ? c++ : p === 92 && (r++, r < o && f.charCodeAt(r) === 10 && c++)
    }
    if (b < 0 || f.charCodeAt(b + 1) !== 58) return !1;
    for (r = b + 2; r < o; r++) {
        const p = f.charCodeAt(r);
        if (p === 10) c++;
        else if (!C(p)) break
    }
    const h = u.md.helpers.parseLinkDestination(f, r, o);
    if (!h.ok) return !1;
    const l = u.md.normalizeLink(h.str);
    if (!u.md.validateLink(l)) return !1;
    r = h.pos, c += h.lines;
    const m = r,
        g = c,
        k = r;
    for (; r < o; r++) {
        const p = f.charCodeAt(r);
        if (p === 10) c++;
        else if (!C(p)) break
    }
    const E = u.md.helpers.parseLinkTitle(f, r, o);
    let x;
    for (r < o && k !== r && E.ok ? (x = E.str, r = E.pos, c += E.lines) : (x = "", r = m, c = g); r < o;) {
        const p = f.charCodeAt(r);
        if (!C(p)) break;
        r++
    }
    if (r < o && f.charCodeAt(r) !== 10 && x)
        for (x = "", r = m, c = g; r < o;) {
            const p = f.charCodeAt(r);
            if (!C(p)) break;
            r++
        }
    if (r < o && f.charCodeAt(r) !== 10) return !1;
    const _ = bu(f.slice(1, b));
    return _ ? (n || (typeof u.env.references > "u" && (u.env.references = {}), typeof u.env.references[_] > "u" && (u.env.references[_] = {
        title: x,
        href: l
    }), u.parentType = d, u.line = e + c + 1), !0) : !1
}
const St = ["address", "article", "aside", "base", "basefont", "blockquote", "body", "caption", "center", "col", "colgroup", "dd", "details", "dialog", "dir", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hr", "html", "iframe", "legend", "li", "link", "main", "menu", "menuitem", "nav", "noframes", "ol", "optgroup", "option", "p", "param", "section", "source", "summary", "table", "tbody", "td", "tfoot", "th", "thead", "title", "tr", "track", "ul"],
    vt = "[a-zA-Z_:][a-zA-Z0-9:._-]*",
    Tt = "[^\"'=<>`\\x00-\\x20]+",
    It = "'[^']*'",
    Rt = '"[^"]*"',
    Ot = "(?:" + Tt + "|" + It + "|" + Rt + ")",
    Bt = "(?:\\s+" + vt + "(?:\\s*=\\s*" + Ot + ")?)",
    C0 = "<[A-Za-z][A-Za-z0-9\\-]*" + Bt + "*\\s*\\/?>",
    D0 = "<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>",
    Mt = "<!---->|<!--(?:-?[^>-])(?:-?[^-])*-->",
    Nt = "<[?][\\s\\S]*?[?]>",
    Lt = "<![A-Z]+\\s+[^>]*>",
    qt = "<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",
    zt = new RegExp("^(?:" + C0 + "|" + D0 + "|" + Mt + "|" + Nt + "|" + Lt + "|" + qt + ")"),
    Pt = new RegExp("^(?:" + C0 + "|" + D0 + ")"),
    j = [
        [/^<(script|pre|style|textarea)(?=(\s|>|$))/i, /<\/(script|pre|style|textarea)>/i, !0],
        [/^<!--/, /-->/, !0],
        [/^<\?/, /\?>/, !0],
        [/^<![A-Z]/, />/, !0],
        [/^<!\[CDATA\[/, /\]\]>/, !0],
        [new RegExp("^</?(" + St.join("|") + ")(?=(\\s|/?>|$))", "i"), /^$/, !0],
        [new RegExp(Pt.source + "\\s*$"), /^$/, !1]
    ];

function $t(u, e, t, n) {
    let c = u.bMarks[e] + u.tShift[e],
        r = u.eMarks[e];
    if (u.sCount[e] - u.blkIndent >= 4 || !u.md.options.html || u.src.charCodeAt(c) !== 60) return !1;
    let o = u.src.slice(c, r),
        i = 0;
    for (; i < j.length && !j[i][0].test(o); i++);
    if (i === j.length) return !1;
    if (n) return j[i][2];
    let a = e + 1;
    if (!j[i][1].test(o)) {
        for (; a < t && !(u.sCount[a] < u.blkIndent); a++)
            if (c = u.bMarks[a] + u.tShift[a], r = u.eMarks[a], o = u.src.slice(c, r), j[i][1].test(o)) {
                o.length !== 0 && a++;
                break
            }
    }
    u.line = a;
    const s = u.push("html_block", "", 0);
    return s.map = [e, a], s.content = u.getLines(e, a, u.blkIndent, !0), !0
}

function jt(u, e, t, n) {
    let c = u.bMarks[e] + u.tShift[e],
        r = u.eMarks[e];
    if (u.sCount[e] - u.blkIndent >= 4) return !1;
    let o = u.src.charCodeAt(c);
    if (o !== 35 || c >= r) return !1;
    let i = 1;
    for (o = u.src.charCodeAt(++c); o === 35 && c < r && i <= 6;) i++, o = u.src.charCodeAt(++c);
    if (i > 6 || c < r && !C(o)) return !1;
    if (n) return !0;
    r = u.skipSpacesBack(r, c);
    const a = u.skipCharsBack(r, 35, c);
    a > c && C(u.src.charCodeAt(a - 1)) && (r = a), u.line = e + 1;
    const s = u.push("heading_open", "h" + String(i), 1);
    s.markup = "########".slice(0, i), s.map = [e, u.line];
    const d = u.push("inline", "", 0);
    d.content = u.src.slice(c, r).trim(), d.map = [e, u.line], d.children = [];
    const f = u.push("heading_close", "h" + String(i), -1);
    return f.markup = "########".slice(0, i), !0
}

function Ht(u, e, t) {
    const n = u.md.block.ruler.getRules("paragraph");
    if (u.sCount[e] - u.blkIndent >= 4) return !1;
    const c = u.parentType;
    u.parentType = "paragraph";
    let r = 0,
        o, i = e + 1;
    for (; i < t && !u.isEmpty(i); i++) {
        if (u.sCount[i] - u.blkIndent > 3) continue;
        if (u.sCount[i] >= u.blkIndent) {
            let h = u.bMarks[i] + u.tShift[i];
            const l = u.eMarks[i];
            if (h < l && (o = u.src.charCodeAt(h), (o === 45 || o === 61) && (h = u.skipChars(h, o), h = u.skipSpaces(h), h >= l))) {
                r = o === 61 ? 1 : 2;
                break
            }
        }
        if (u.sCount[i] < 0) continue;
        let b = !1;
        for (let h = 0, l = n.length; h < l; h++)
            if (n[h](u, i, t, !0)) {
                b = !0;
                break
            }
        if (b) break
    }
    if (!r) return !1;
    const a = u.getLines(e, i, u.blkIndent, !1).trim();
    u.line = i + 1;
    const s = u.push("heading_open", "h" + String(r), 1);
    s.markup = String.fromCharCode(o), s.map = [e, u.line];
    const d = u.push("inline", "", 0);
    d.content = a, d.map = [e, u.line - 1], d.children = [];
    const f = u.push("heading_close", "h" + String(r), -1);
    return f.markup = String.fromCharCode(o), u.parentType = c, !0
}

function Ut(u, e, t) {
    const n = u.md.block.ruler.getRules("paragraph"),
        c = u.parentType;
    let r = e + 1;
    for (u.parentType = "paragraph"; r < t && !u.isEmpty(r); r++) {
        if (u.sCount[r] - u.blkIndent > 3 || u.sCount[r] < 0) continue;
        let s = !1;
        for (let d = 0, f = n.length; d < f; d++)
            if (n[d](u, r, t, !0)) {
                s = !0;
                break
            }
        if (s) break
    }
    const o = u.getLines(e, r, u.blkIndent, !1).trim();
    u.line = r;
    const i = u.push("paragraph_open", "p", 1);
    i.map = [e, u.line];
    const a = u.push("inline", "", 0);
    return a.content = o, a.map = [e, u.line], a.children = [], u.push("paragraph_close", "p", -1), u.parentType = c, !0
}
const ou = [
    ["table", kt, ["paragraph", "reference"]],
    ["code", Et],
    ["fence", Ct, ["paragraph", "reference", "blockquote", "list"]],
    ["blockquote", Dt, ["paragraph", "reference", "blockquote", "list"]],
    ["hr", At, ["paragraph", "reference", "blockquote", "list"]],
    ["list", Ft, ["paragraph", "reference", "blockquote"]],
    ["reference", wt],
    ["html_block", $t, ["paragraph", "reference", "blockquote"]],
    ["heading", jt, ["paragraph", "reference", "blockquote"]],
    ["lheading", Ht],
    ["paragraph", Ut]
];

function pu() {
    this.ruler = new w;
    for (let u = 0; u < ou.length; u++) this.ruler.push(ou[u][0], ou[u][1], {
        alt: (ou[u][2] || []).slice()
    })
}
pu.prototype.tokenize = function(u, e, t) {
    const n = this.ruler.getRules(""),
        c = n.length,
        r = u.md.options.maxNesting;
    let o = e,
        i = !1;
    for (; o < t && (u.line = o = u.skipEmptyLines(o), !(o >= t || u.sCount[o] < u.blkIndent));) {
        if (u.level >= r) {
            u.line = t;
            break
        }
        const a = u.line;
        let s = !1;
        for (let d = 0; d < c; d++)
            if (s = n[d](u, o, t, !1), s) {
                if (a >= u.line) throw new Error("block rule didn't increment state.line");
                break
            }
        if (!s) throw new Error("none of the block rules matched");
        u.tight = !i, u.isEmpty(u.line - 1) && (i = !0), o = u.line, o < t && u.isEmpty(o) && (i = !0, o++, u.line = o)
    }
};
pu.prototype.parse = function(u, e, t, n) {
    if (!u) return;
    const c = new this.State(u, e, t, n);
    this.tokenize(c, c.line, c.lineMax)
};
pu.prototype.State = B;

function ru(u, e, t, n) {
    this.src = u, this.env = t, this.md = e, this.tokens = n, this.tokens_meta = Array(n.length), this.pos = 0, this.posMax = this.src.length, this.level = 0, this.pending = "", this.pendingLevel = 0, this.cache = {}, this.delimiters = [], this._prev_delimiters = [], this.backticks = {}, this.backticksScanned = !1, this.linkLevel = 0
}
ru.prototype.pushPending = function() {
    const u = new T("text", "", 0);
    return u.content = this.pending, u.level = this.pendingLevel, this.tokens.push(u), this.pending = "", u
};
ru.prototype.push = function(u, e, t) {
    this.pending && this.pushPending();
    const n = new T(u, e, t);
    let c = null;
    return t < 0 && (this.level--, this.delimiters = this._prev_delimiters.pop()), n.level = this.level, t > 0 && (this.level++, this._prev_delimiters.push(this.delimiters), this.delimiters = [], c = {
        delimiters: this.delimiters
    }), this.pendingLevel = this.level, this.tokens.push(n), this.tokens_meta.push(c), n
};
ru.prototype.scanDelims = function(u, e) {
    let t, n, c = !0,
        r = !0;
    const o = this.posMax,
        i = this.src.charCodeAt(u),
        a = u > 0 ? this.src.charCodeAt(u - 1) : 32;
    let s = u;
    for (; s < o && this.src.charCodeAt(s) === i;) s++;
    const d = s - u,
        f = s < o ? this.src.charCodeAt(s) : 32,
        b = X(a) || Q(String.fromCharCode(a)),
        h = X(f) || Q(String.fromCharCode(f)),
        l = J(a),
        m = J(f);
    return m ? c = !1 : h && (l || b || (c = !1)), l ? r = !1 : b && (m || h || (r = !1)), e ? (t = c, n = r) : (t = c && (!r || b), n = r && (!c || h)), {
        can_open: t,
        can_close: n,
        length: d
    }
};
ru.prototype.Token = T;

function Gt(u) {
    switch (u) {
        case 10:
        case 33:
        case 35:
        case 36:
        case 37:
        case 38:
        case 42:
        case 43:
        case 45:
        case 58:
        case 60:
        case 61:
        case 62:
        case 64:
        case 91:
        case 92:
        case 93:
        case 94:
        case 95:
        case 96:
        case 123:
        case 125:
        case 126:
            return !0;
        default:
            return !1
    }
}

function Zt(u, e) {
    let t = u.pos;
    for (; t < u.posMax && !Gt(u.src.charCodeAt(t));) t++;
    return t === u.pos ? !1 : (e || (u.pending += u.src.slice(u.pos, t)), u.pos = t, !0)
}
const Vt = /(?:^|[^a-z0-9.+-])([a-z][a-z0-9.+-]*)$/i;

function Kt(u, e) {
    if (!u.md.options.linkify || u.linkLevel > 0) return !1;
    const t = u.pos,
        n = u.posMax;
    if (t + 3 > n || u.src.charCodeAt(t) !== 58 || u.src.charCodeAt(t + 1) !== 47 || u.src.charCodeAt(t + 2) !== 47) return !1;
    const c = u.pending.match(Vt);
    if (!c) return !1;
    const r = c[1],
        o = u.md.linkify.matchAtStart(u.src.slice(t - r.length));
    if (!o) return !1;
    let i = o.url;
    if (i.length <= r.length) return !1;
    i = i.replace(/\*+$/, "");
    const a = u.md.normalizeLink(i);
    if (!u.md.validateLink(a)) return !1;
    if (!e) {
        u.pending = u.pending.slice(0, -r.length);
        const s = u.push("link_open", "a", 1);
        s.attrs = [
            ["href", a]
        ], s.markup = "linkify", s.info = "auto";
        const d = u.push("text", "", 0);
        d.content = u.md.normalizeLinkText(i);
        const f = u.push("link_close", "a", -1);
        f.markup = "linkify", f.info = "auto"
    }
    return u.pos += i.length - r.length, !0
}

function Wt(u, e) {
    let t = u.pos;
    if (u.src.charCodeAt(t) !== 10) return !1;
    const n = u.pending.length - 1,
        c = u.posMax;
    if (!e)
        if (n >= 0 && u.pending.charCodeAt(n) === 32)
            if (n >= 1 && u.pending.charCodeAt(n - 1) === 32) {
                let r = n - 1;
                for (; r >= 1 && u.pending.charCodeAt(r - 1) === 32;) r--;
                u.pending = u.pending.slice(0, r), u.push("hardbreak", "br", 0)
            } else u.pending = u.pending.slice(0, -1), u.push("softbreak", "br", 0);
    else u.push("softbreak", "br", 0);
    for (t++; t < c && C(u.src.charCodeAt(t));) t++;
    return u.pos = t, !0
}
const Mu = [];
for (let u = 0; u < 256; u++) Mu.push(0);
"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(u) {
    Mu[u.charCodeAt(0)] = 1
});

function Yt(u, e) {
    let t = u.pos;
    const n = u.posMax;
    if (u.src.charCodeAt(t) !== 92 || (t++, t >= n)) return !1;
    let c = u.src.charCodeAt(t);
    if (c === 10) {
        for (e || u.push("hardbreak", "br", 0), t++; t < n && (c = u.src.charCodeAt(t), !!C(c));) t++;
        return u.pos = t, !0
    }
    let r = u.src[t];
    if (c >= 55296 && c <= 56319 && t + 1 < n) {
        const i = u.src.charCodeAt(t + 1);
        i >= 56320 && i <= 57343 && (r += u.src[t + 1], t++)
    }
    const o = "\\" + r;
    if (!e) {
        const i = u.push("text_special", "", 0);
        c < 256 && Mu[c] !== 0 ? i.content = r : i.content = o, i.markup = o, i.info = "escape"
    }
    return u.pos = t + 1, !0
}

function Jt(u, e) {
    let t = u.pos;
    if (u.src.charCodeAt(t) !== 96) return !1;
    const c = t;
    t++;
    const r = u.posMax;
    for (; t < r && u.src.charCodeAt(t) === 96;) t++;
    const o = u.src.slice(c, t),
        i = o.length;
    if (u.backticksScanned && (u.backticks[i] || 0) <= c) return e || (u.pending += o), u.pos += i, !0;
    let a = t,
        s;
    for (;
        (s = u.src.indexOf("`", a)) !== -1;) {
        for (a = s + 1; a < r && u.src.charCodeAt(a) === 96;) a++;
        const d = a - s;
        if (d === i) {
            if (!e) {
                const f = u.push("code_inline", "code", 0);
                f.markup = o, f.content = u.src.slice(t, s).replace(/\n/g, " ").replace(/^ (.+) $/, "$1")
            }
            return u.pos = a, !0
        }
        u.backticks[d] = s
    }
    return u.backticksScanned = !0, e || (u.pending += o), u.pos += i, !0
}

function Qt(u, e) {
    const t = u.pos,
        n = u.src.charCodeAt(t);
    if (e || n !== 126) return !1;
    const c = u.scanDelims(u.pos, !0);
    let r = c.length;
    const o = String.fromCharCode(n);
    if (r < 2) return !1;
    let i;
    r % 2 && (i = u.push("text", "", 0), i.content = o, r--);
    for (let a = 0; a < r; a += 2) i = u.push("text", "", 0), i.content = o + o, u.delimiters.push({
        marker: n,
        length: 0,
        token: u.tokens.length - 1,
        end: -1,
        open: c.can_open,
        close: c.can_close
    });
    return u.pos += c.length, !0
}

function r0(u, e) {
    let t;
    const n = [],
        c = e.length;
    for (let r = 0; r < c; r++) {
        const o = e[r];
        if (o.marker !== 126 || o.end === -1) continue;
        const i = e[o.end];
        t = u.tokens[o.token], t.type = "s_open", t.tag = "s", t.nesting = 1, t.markup = "~~", t.content = "", t = u.tokens[i.token], t.type = "s_close", t.tag = "s", t.nesting = -1, t.markup = "~~", t.content = "", u.tokens[i.token - 1].type === "text" && u.tokens[i.token - 1].content === "~" && n.push(i.token - 1)
    }
    for (; n.length;) {
        const r = n.pop();
        let o = r + 1;
        for (; o < u.tokens.length && u.tokens[o].type === "s_close";) o++;
        o--, r !== o && (t = u.tokens[o], u.tokens[o] = u.tokens[r], u.tokens[r] = t)
    }
}

function Xt(u) {
    const e = u.tokens_meta,
        t = u.tokens_meta.length;
    r0(u, u.delimiters);
    for (let n = 0; n < t; n++) e[n] && e[n].delimiters && r0(u, e[n].delimiters)
}
const A0 = {
    tokenize: Qt,
    postProcess: Xt
};

function un(u, e) {
    const t = u.pos,
        n = u.src.charCodeAt(t);
    if (e || n !== 95 && n !== 42) return !1;
    const c = u.scanDelims(u.pos, n === 42);
    for (let r = 0; r < c.length; r++) {
        const o = u.push("text", "", 0);
        o.content = String.fromCharCode(n), u.delimiters.push({
            marker: n,
            length: c.length,
            token: u.tokens.length - 1,
            end: -1,
            open: c.can_open,
            close: c.can_close
        })
    }
    return u.pos += c.length, !0
}

function c0(u, e) {
    const t = e.length;
    for (let n = t - 1; n >= 0; n--) {
        const c = e[n];
        if (c.marker !== 95 && c.marker !== 42 || c.end === -1) continue;
        const r = e[c.end],
            o = n > 0 && e[n - 1].end === c.end + 1 && e[n - 1].marker === c.marker && e[n - 1].token === c.token - 1 && e[c.end + 1].token === r.token + 1,
            i = String.fromCharCode(c.marker),
            a = u.tokens[c.token];
        a.type = o ? "strong_open" : "em_open", a.tag = o ? "strong" : "em", a.nesting = 1, a.markup = o ? i + i : i, a.content = "";
        const s = u.tokens[r.token];
        s.type = o ? "strong_close" : "em_close", s.tag = o ? "strong" : "em", s.nesting = -1, s.markup = o ? i + i : i, s.content = "", o && (u.tokens[e[n - 1].token].content = "", u.tokens[e[c.end + 1].token].content = "", n--)
    }
}

function en(u) {
    const e = u.tokens_meta,
        t = u.tokens_meta.length;
    c0(u, u.delimiters);
    for (let n = 0; n < t; n++) e[n] && e[n].delimiters && c0(u, e[n].delimiters)
}
const y0 = {
    tokenize: un,
    postProcess: en
};

function tn(u, e) {
    let t, n, c, r, o = "",
        i = "",
        a = u.pos,
        s = !0;
    if (u.src.charCodeAt(u.pos) !== 91) return !1;
    const d = u.pos,
        f = u.posMax,
        b = u.pos + 1,
        h = u.md.helpers.parseLinkLabel(u, u.pos, !0);
    if (h < 0) return !1;
    let l = h + 1;
    if (l < f && u.src.charCodeAt(l) === 40) {
        for (s = !1, l++; l < f && (t = u.src.charCodeAt(l), !(!C(t) && t !== 10)); l++);
        if (l >= f) return !1;
        if (a = l, c = u.md.helpers.parseLinkDestination(u.src, l, u.posMax), c.ok) {
            for (o = u.md.normalizeLink(c.str), u.md.validateLink(o) ? l = c.pos : o = "", a = l; l < f && (t = u.src.charCodeAt(l), !(!C(t) && t !== 10)); l++);
            if (c = u.md.helpers.parseLinkTitle(u.src, l, u.posMax), l < f && a !== l && c.ok)
                for (i = c.str, l = c.pos; l < f && (t = u.src.charCodeAt(l), !(!C(t) && t !== 10)); l++);
        }(l >= f || u.src.charCodeAt(l) !== 41) && (s = !0), l++
    }
    if (s) {
        if (typeof u.env.references > "u") return !1;
        if (l < f && u.src.charCodeAt(l) === 91 ? (a = l + 1, l = u.md.helpers.parseLinkLabel(u, l), l >= 0 ? n = u.src.slice(a, l++) : l = h + 1) : l = h + 1, n || (n = u.src.slice(b, h)), r = u.env.references[bu(n)], !r) return u.pos = d, !1;
        o = r.href, i = r.title
    }
    if (!e) {
        u.pos = b, u.posMax = h;
        const m = u.push("link_open", "a", 1),
            g = [
                ["href", o]
            ];
        m.attrs = g, i && g.push(["title", i]), u.linkLevel++, u.md.inline.tokenize(u), u.linkLevel--, u.push("link_close", "a", -1)
    }
    return u.pos = l, u.posMax = f, !0
}

function nn(u, e) {
    let t, n, c, r, o, i, a, s, d = "";
    const f = u.pos,
        b = u.posMax;
    if (u.src.charCodeAt(u.pos) !== 33 || u.src.charCodeAt(u.pos + 1) !== 91) return !1;
    const h = u.pos + 2,
        l = u.md.helpers.parseLinkLabel(u, u.pos + 1, !1);
    if (l < 0) return !1;
    if (r = l + 1, r < b && u.src.charCodeAt(r) === 40) {
        for (r++; r < b && (t = u.src.charCodeAt(r), !(!C(t) && t !== 10)); r++);
        if (r >= b) return !1;
        for (s = r, i = u.md.helpers.parseLinkDestination(u.src, r, u.posMax), i.ok && (d = u.md.normalizeLink(i.str), u.md.validateLink(d) ? r = i.pos : d = ""), s = r; r < b && (t = u.src.charCodeAt(r), !(!C(t) && t !== 10)); r++);
        if (i = u.md.helpers.parseLinkTitle(u.src, r, u.posMax), r < b && s !== r && i.ok)
            for (a = i.str, r = i.pos; r < b && (t = u.src.charCodeAt(r), !(!C(t) && t !== 10)); r++);
        else a = "";
        if (r >= b || u.src.charCodeAt(r) !== 41) return u.pos = f, !1;
        r++
    } else {
        if (typeof u.env.references > "u") return !1;
        if (r < b && u.src.charCodeAt(r) === 91 ? (s = r + 1, r = u.md.helpers.parseLinkLabel(u, r), r >= 0 ? c = u.src.slice(s, r++) : r = l + 1) : r = l + 1, c || (c = u.src.slice(h, l)), o = u.env.references[bu(c)], !o) return u.pos = f, !1;
        d = o.href, a = o.title
    }
    if (!e) {
        n = u.src.slice(h, l);
        const m = [];
        u.md.inline.parse(n, u.md, u.env, m);
        const g = u.push("image", "img", 0),
            k = [
                ["src", d],
                ["alt", ""]
            ];
        g.attrs = k, g.children = m, g.content = n, a && k.push(["title", a])
    }
    return u.pos = r, u.posMax = b, !0
}
const rn = /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/,
    cn = /^([a-zA-Z][a-zA-Z0-9+.-]{1,31}):([^<>\x00-\x20]*)$/;

function on(u, e) {
    let t = u.pos;
    if (u.src.charCodeAt(t) !== 60) return !1;
    const n = u.pos,
        c = u.posMax;
    for (;;) {
        if (++t >= c) return !1;
        const o = u.src.charCodeAt(t);
        if (o === 60) return !1;
        if (o === 62) break
    }
    const r = u.src.slice(n + 1, t);
    if (cn.test(r)) {
        const o = u.md.normalizeLink(r);
        if (!u.md.validateLink(o)) return !1;
        if (!e) {
            const i = u.push("link_open", "a", 1);
            i.attrs = [
                ["href", o]
            ], i.markup = "autolink", i.info = "auto";
            const a = u.push("text", "", 0);
            a.content = u.md.normalizeLinkText(r);
            const s = u.push("link_close", "a", -1);
            s.markup = "autolink", s.info = "auto"
        }
        return u.pos += r.length + 2, !0
    }
    if (rn.test(r)) {
        const o = u.md.normalizeLink("mailto:" + r);
        if (!u.md.validateLink(o)) return !1;
        if (!e) {
            const i = u.push("link_open", "a", 1);
            i.attrs = [
                ["href", o]
            ], i.markup = "autolink", i.info = "auto";
            const a = u.push("text", "", 0);
            a.content = u.md.normalizeLinkText(r);
            const s = u.push("link_close", "a", -1);
            s.markup = "autolink", s.info = "auto"
        }
        return u.pos += r.length + 2, !0
    }
    return !1
}

function an(u) {
    return /^<a[>\s]/i.test(u)
}

function sn(u) {
    return /^<\/a\s*>/i.test(u)
}

function fn(u) {
    const e = u | 32;
    return e >= 97 && e <= 122
}

function ln(u, e) {
    if (!u.md.options.html) return !1;
    const t = u.posMax,
        n = u.pos;
    if (u.src.charCodeAt(n) !== 60 || n + 2 >= t) return !1;
    const c = u.src.charCodeAt(n + 1);
    if (c !== 33 && c !== 63 && c !== 47 && !fn(c)) return !1;
    const r = u.src.slice(n).match(zt);
    if (!r) return !1;
    if (!e) {
        const o = u.push("html_inline", "", 0);
        o.content = r[0], an(o.content) && u.linkLevel++, sn(o.content) && u.linkLevel--
    }
    return u.pos += r[0].length, !0
}
const dn = /^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i,
    hn = /^&([a-z][a-z0-9]{1,31});/i;

function bn(u, e) {
    const t = u.pos,
        n = u.posMax;
    if (u.src.charCodeAt(t) !== 38 || t + 1 >= n) return !1;
    if (u.src.charCodeAt(t + 1) === 35) {
        const r = u.src.slice(t).match(dn);
        if (r) {
            if (!e) {
                const o = r[1][0].toLowerCase() === "x" ? parseInt(r[1].slice(1), 16) : parseInt(r[1], 10),
                    i = u.push("text_special", "", 0);
                i.content = Ou(o) ? lu(o) : lu(65533), i.markup = r[0], i.info = "entity"
            }
            return u.pos += r[0].length, !0
        }
    } else {
        const r = u.src.slice(t).match(hn);
        if (r) {
            const o = _0(r[0]);
            if (o !== r[0]) {
                if (!e) {
                    const i = u.push("text_special", "", 0);
                    i.content = o, i.markup = r[0], i.info = "entity"
                }
                return u.pos += r[0].length, !0
            }
        }
    }
    return !1
}

function i0(u) {
    const e = {},
        t = u.length;
    if (!t) return;
    let n = 0,
        c = -2;
    const r = [];
    for (let o = 0; o < t; o++) {
        const i = u[o];
        if (r.push(0), (u[n].marker !== i.marker || c !== i.token - 1) && (n = o), c = i.token, i.length = i.length || 0, !i.close) continue;
        e.hasOwnProperty(i.marker) || (e[i.marker] = [-1, -1, -1, -1, -1, -1]);
        const a = e[i.marker][(i.open ? 3 : 0) + i.length % 3];
        let s = n - r[n] - 1,
            d = s;
        for (; s > a; s -= r[s] + 1) {
            const f = u[s];
            if (f.marker === i.marker && f.open && f.end < 0) {
                let b = !1;
                if ((f.close || i.open) && (f.length + i.length) % 3 === 0 && (f.length % 3 !== 0 || i.length % 3 !== 0) && (b = !0), !b) {
                    const h = s > 0 && !u[s - 1].open ? r[s - 1] + 1 : 0;
                    r[o] = o - s + h, r[s] = h, i.open = !1, f.end = o, f.close = !1, d = -1, c = -2;
                    break
                }
            }
        }
        d !== -1 && (e[i.marker][(i.open ? 3 : 0) + (i.length || 0) % 3] = d)
    }
}

function pn(u) {
    const e = u.tokens_meta,
        t = u.tokens_meta.length;
    i0(u.delimiters);
    for (let n = 0; n < t; n++) e[n] && e[n].delimiters && i0(e[n].delimiters)
}

function xn(u) {
    let e, t, n = 0;
    const c = u.tokens,
        r = u.tokens.length;
    for (e = t = 0; e < r; e++) c[e].nesting < 0 && n--, c[e].level = n, c[e].nesting > 0 && n++, c[e].type === "text" && e + 1 < r && c[e + 1].type === "text" ? c[e + 1].content = c[e].content + c[e + 1].content : (e !== t && (c[t] = c[e]), t++);
    e !== t && (c.length = t)
}
const Eu = [
        ["text", Zt],
        ["linkify", Kt],
        ["newline", Wt],
        ["escape", Yt],
        ["backticks", Jt],
        ["strikethrough", A0.tokenize],
        ["emphasis", y0.tokenize],
        ["link", tn],
        ["image", nn],
        ["autolink", on],
        ["html_inline", ln],
        ["entity", bn]
    ],
    Cu = [
        ["balance_pairs", pn],
        ["strikethrough", A0.postProcess],
        ["emphasis", y0.postProcess],
        ["fragments_join", xn]
    ];

function cu() {
    this.ruler = new w;
    for (let u = 0; u < Eu.length; u++) this.ruler.push(Eu[u][0], Eu[u][1]);
    this.ruler2 = new w;
    for (let u = 0; u < Cu.length; u++) this.ruler2.push(Cu[u][0], Cu[u][1])
}
cu.prototype.skipToken = function(u) {
    const e = u.pos,
        t = this.ruler.getRules(""),
        n = t.length,
        c = u.md.options.maxNesting,
        r = u.cache;
    if (typeof r[e] < "u") {
        u.pos = r[e];
        return
    }
    let o = !1;
    if (u.level < c) {
        for (let i = 0; i < n; i++)
            if (u.level++, o = t[i](u, !0), u.level--, o) {
                if (e >= u.pos) throw new Error("inline rule didn't increment state.pos");
                break
            }
    } else u.pos = u.posMax;
    o || u.pos++, r[e] = u.pos
};
cu.prototype.tokenize = function(u) {
    const e = this.ruler.getRules(""),
        t = e.length,
        n = u.posMax,
        c = u.md.options.maxNesting;
    for (; u.pos < n;) {
        const r = u.pos;
        let o = !1;
        if (u.level < c) {
            for (let i = 0; i < t; i++)
                if (o = e[i](u, !1), o) {
                    if (r >= u.pos) throw new Error("inline rule didn't increment state.pos");
                    break
                }
        }
        if (o) {
            if (u.pos >= n) break;
            continue
        }
        u.pending += u.src[u.pos++]
    }
    u.pending && u.pushPending()
};
cu.prototype.parse = function(u, e, t, n) {
    const c = new this.State(u, e, t, n);
    this.tokenize(c);
    const r = this.ruler2.getRules(""),
        o = r.length;
    for (let i = 0; i < o; i++) r[i](c)
};
cu.prototype.State = ru;

function _n(u) {
    const e = {};
    u = u || {}, e.src_Any = h0.source, e.src_Cc = b0.source, e.src_Z = p0.source, e.src_P = Iu.source, e.src_ZPCc = [e.src_Z, e.src_P, e.src_Cc].join("|"), e.src_ZCc = [e.src_Z, e.src_Cc].join("|");
    const t = "[><｜]";
    return e.src_pseudo_letter = "(?:(?!" + t + "|" + e.src_ZPCc + ")" + e.src_Any + ")", e.src_ip4 = "(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)", e.src_auth = "(?:(?:(?!" + e.src_ZCc + "|[@/\\[\\]()]).)+@)?", e.src_port = "(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?", e.src_host_terminator = "(?=$|" + t + "|" + e.src_ZPCc + ")(?!" + (u["---"] ? "-(?!--)|" : "-|") + "_|:\\d|\\.-|\\.(?!$|" + e.src_ZPCc + "))", e.src_path = "(?:[/?#](?:(?!" + e.src_ZCc + "|" + t + `|[()[\\]{}.,"'?!\\-;]).|\\[(?:(?!` + e.src_ZCc + "|\\]).)*\\]|\\((?:(?!" + e.src_ZCc + "|[)]).)*\\)|\\{(?:(?!" + e.src_ZCc + '|[}]).)*\\}|\\"(?:(?!' + e.src_ZCc + `|["]).)+\\"|\\'(?:(?!` + e.src_ZCc + "|[']).)+\\'|\\'(?=" + e.src_pseudo_letter + "|[-])|\\.{2,}[a-zA-Z0-9%/&]|\\.(?!" + e.src_ZCc + "|[.]|$)|" + (u["---"] ? "\\-(?!--(?:[^-]|$))(?:-*)|" : "\\-+|") + ",(?!" + e.src_ZCc + "|$)|;(?!" + e.src_ZCc + "|$)|\\!+(?!" + e.src_ZCc + "|[!]|$)|\\?(?!" + e.src_ZCc + "|[?]|$))+|\\/)?", e.src_email_name = '[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]*', e.src_xn = "xn--[a-z0-9\\-]{1,59}", e.src_domain_root = "(?:" + e.src_xn + "|" + e.src_pseudo_letter + "{1,63})", e.src_domain = "(?:" + e.src_xn + "|(?:" + e.src_pseudo_letter + ")|(?:" + e.src_pseudo_letter + "(?:-|" + e.src_pseudo_letter + "){0,61}" + e.src_pseudo_letter + "))", e.src_host = "(?:(?:(?:(?:" + e.src_domain + ")\\.)*" + e.src_domain + "))", e.tpl_host_fuzzy = "(?:" + e.src_ip4 + "|(?:(?:(?:" + e.src_domain + ")\\.)+(?:%TLDS%)))", e.tpl_host_no_ip_fuzzy = "(?:(?:(?:" + e.src_domain + ")\\.)+(?:%TLDS%))", e.src_host_strict = e.src_host + e.src_host_terminator, e.tpl_host_fuzzy_strict = e.tpl_host_fuzzy + e.src_host_terminator, e.src_host_port_strict = e.src_host + e.src_port + e.src_host_terminator, e.tpl_host_port_fuzzy_strict = e.tpl_host_fuzzy + e.src_port + e.src_host_terminator, e.tpl_host_port_no_ip_fuzzy_strict = e.tpl_host_no_ip_fuzzy + e.src_port + e.src_host_terminator, e.tpl_host_fuzzy_test = "localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:" + e.src_ZPCc + "|>|$))", e.tpl_email_fuzzy = "(^|" + t + '|"|\\(|' + e.src_ZCc + ")(" + e.src_email_name + "@" + e.tpl_host_fuzzy_strict + ")", e.tpl_link_fuzzy = "(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|" + e.src_ZPCc + "))((?![$+<=>^`|｜])" + e.tpl_host_port_fuzzy_strict + e.src_path + ")", e.tpl_link_no_ip_fuzzy = "(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|" + e.src_ZPCc + "))((?![$+<=>^`|｜])" + e.tpl_host_port_no_ip_fuzzy_strict + e.src_path + ")", e
}

function Fu(u) {
    return Array.prototype.slice.call(arguments, 1).forEach(function(t) {
        t && Object.keys(t).forEach(function(n) {
            u[n] = t[n]
        })
    }), u
}

function xu(u) {
    return Object.prototype.toString.call(u)
}

function mn(u) {
    return xu(u) === "[object String]"
}

function gn(u) {
    return xu(u) === "[object Object]"
}

function kn(u) {
    return xu(u) === "[object RegExp]"
}

function o0(u) {
    return xu(u) === "[object Function]"
}

function En(u) {
    return u.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&")
}
const F0 = {
    fuzzyLink: !0,
    fuzzyEmail: !0,
    fuzzyIP: !1
};

function Cn(u) {
    return Object.keys(u || {}).reduce(function(e, t) {
        return e || F0.hasOwnProperty(t)
    }, !1)
}
const Dn = {
        "http:": {
            validate: function(u, e, t) {
                const n = u.slice(e);
                return t.re.http || (t.re.http = new RegExp("^\\/\\/" + t.re.src_auth + t.re.src_host_port_strict + t.re.src_path, "i")), t.re.http.test(n) ? n.match(t.re.http)[0].length : 0
            }
        },
        "https:": "http:",
        "ftp:": "http:",
        "//": {
            validate: function(u, e, t) {
                const n = u.slice(e);
                return t.re.no_http || (t.re.no_http = new RegExp("^" + t.re.src_auth + "(?:localhost|(?:(?:" + t.re.src_domain + ")\\.)+" + t.re.src_domain_root + ")" + t.re.src_port + t.re.src_host_terminator + t.re.src_path, "i")), t.re.no_http.test(n) ? e >= 3 && u[e - 3] === ":" || e >= 3 && u[e - 3] === "/" ? 0 : n.match(t.re.no_http)[0].length : 0
            }
        },
        "mailto:": {
            validate: function(u, e, t) {
                const n = u.slice(e);
                return t.re.mailto || (t.re.mailto = new RegExp("^" + t.re.src_email_name + "@" + t.re.src_host_strict, "i")), t.re.mailto.test(n) ? n.match(t.re.mailto)[0].length : 0
            }
        }
    },
    An = "a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]",
    yn = "biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф".split("|");

function Fn(u) {
    u.__index__ = -1, u.__text_cache__ = ""
}

function wn(u) {
    return function(e, t) {
        const n = e.slice(t);
        return u.test(n) ? n.match(u)[0].length : 0
    }
}

function a0() {
    return function(u, e) {
        e.normalize(u)
    }
}

function du(u) {
    const e = u.re = _n(u.__opts__),
        t = u.__tlds__.slice();
    u.onCompile(), u.__tlds_replaced__ || t.push(An), t.push(e.src_xn), e.src_tlds = t.join("|");

    function n(i) {
        return i.replace("%TLDS%", e.src_tlds)
    }
    e.email_fuzzy = RegExp(n(e.tpl_email_fuzzy), "i"), e.link_fuzzy = RegExp(n(e.tpl_link_fuzzy), "i"), e.link_no_ip_fuzzy = RegExp(n(e.tpl_link_no_ip_fuzzy), "i"), e.host_fuzzy_test = RegExp(n(e.tpl_host_fuzzy_test), "i");
    const c = [];
    u.__compiled__ = {};

    function r(i, a) {
        throw new Error('(LinkifyIt) Invalid schema "' + i + '": ' + a)
    }
    Object.keys(u.__schemas__).forEach(function(i) {
        const a = u.__schemas__[i];
        if (a === null) return;
        const s = {
            validate: null,
            link: null
        };
        if (u.__compiled__[i] = s, gn(a)) {
            kn(a.validate) ? s.validate = wn(a.validate) : o0(a.validate) ? s.validate = a.validate : r(i, a), o0(a.normalize) ? s.normalize = a.normalize : a.normalize ? r(i, a) : s.normalize = a0();
            return
        }
        if (mn(a)) {
            c.push(i);
            return
        }
        r(i, a)
    }), c.forEach(function(i) {
        u.__compiled__[u.__schemas__[i]] && (u.__compiled__[i].validate = u.__compiled__[u.__schemas__[i]].validate, u.__compiled__[i].normalize = u.__compiled__[u.__schemas__[i]].normalize)
    }), u.__compiled__[""] = {
        validate: null,
        normalize: a0()
    };
    const o = Object.keys(u.__compiled__).filter(function(i) {
        return i.length > 0 && u.__compiled__[i]
    }).map(En).join("|");
    u.re.schema_test = RegExp("(^|(?!_)(?:[><｜]|" + e.src_ZPCc + "))(" + o + ")", "i"), u.re.schema_search = RegExp("(^|(?!_)(?:[><｜]|" + e.src_ZPCc + "))(" + o + ")", "ig"), u.re.schema_at_start = RegExp("^" + u.re.schema_search.source, "i"), u.re.pretest = RegExp("(" + u.re.schema_test.source + ")|(" + u.re.host_fuzzy_test.source + ")|@", "i"), Fn(u)
}

function Sn(u, e) {
    const t = u.__index__,
        n = u.__last_index__,
        c = u.__text_cache__.slice(t, n);
    this.schema = u.__schema__.toLowerCase(), this.index = t + e, this.lastIndex = n + e, this.raw = c, this.text = c, this.url = c
}

function wu(u, e) {
    const t = new Sn(u, e);
    return u.__compiled__[t.schema].normalize(t, u), t
}

function S(u, e) {
    if (!(this instanceof S)) return new S(u, e);
    e || Cn(u) && (e = u, u = {}), this.__opts__ = Fu({}, F0, e), this.__index__ = -1, this.__last_index__ = -1, this.__schema__ = "", this.__text_cache__ = "", this.__schemas__ = Fu({}, Dn, u), this.__compiled__ = {}, this.__tlds__ = yn, this.__tlds_replaced__ = !1, this.re = {}, du(this)
}
S.prototype.add = function(e, t) {
    return this.__schemas__[e] = t, du(this), this
};
S.prototype.set = function(e) {
    return this.__opts__ = Fu(this.__opts__, e), this
};
S.prototype.test = function(e) {
    if (this.__text_cache__ = e, this.__index__ = -1, !e.length) return !1;
    let t, n, c, r, o, i, a, s, d;
    if (this.re.schema_test.test(e)) {
        for (a = this.re.schema_search, a.lastIndex = 0;
            (t = a.exec(e)) !== null;)
            if (r = this.testSchemaAt(e, t[2], a.lastIndex), r) {
                this.__schema__ = t[2], this.__index__ = t.index + t[1].length, this.__last_index__ = t.index + t[0].length + r;
                break
            }
    }
    return this.__opts__.fuzzyLink && this.__compiled__["http:"] && (s = e.search(this.re.host_fuzzy_test), s >= 0 && (this.__index__ < 0 || s < this.__index__) && (n = e.match(this.__opts__.fuzzyIP ? this.re.link_fuzzy : this.re.link_no_ip_fuzzy)) !== null && (o = n.index + n[1].length, (this.__index__ < 0 || o < this.__index__) && (this.__schema__ = "", this.__index__ = o, this.__last_index__ = n.index + n[0].length))), this.__opts__.fuzzyEmail && this.__compiled__["mailto:"] && (d = e.indexOf("@"), d >= 0 && (c = e.match(this.re.email_fuzzy)) !== null && (o = c.index + c[1].length, i = c.index + c[0].length, (this.__index__ < 0 || o < this.__index__ || o === this.__index__ && i > this.__last_index__) && (this.__schema__ = "mailto:", this.__index__ = o, this.__last_index__ = i))), this.__index__ >= 0
};
S.prototype.pretest = function(e) {
    return this.re.pretest.test(e)
};
S.prototype.testSchemaAt = function(e, t, n) {
    return this.__compiled__[t.toLowerCase()] ? this.__compiled__[t.toLowerCase()].validate(e, n, this) : 0
};
S.prototype.match = function(e) {
    const t = [];
    let n = 0;
    this.__index__ >= 0 && this.__text_cache__ === e && (t.push(wu(this, n)), n = this.__last_index__);
    let c = n ? e.slice(n) : e;
    for (; this.test(c);) t.push(wu(this, n)), c = c.slice(this.__last_index__), n += this.__last_index__;
    return t.length ? t : null
};
S.prototype.matchAtStart = function(e) {
    if (this.__text_cache__ = e, this.__index__ = -1, !e.length) return null;
    const t = this.re.schema_at_start.exec(e);
    if (!t) return null;
    const n = this.testSchemaAt(e, t[2], t[0].length);
    return n ? (this.__schema__ = t[2], this.__index__ = t.index + t[1].length, this.__last_index__ = t.index + t[0].length + n, wu(this, 0)) : null
};
S.prototype.tlds = function(e, t) {
    return e = Array.isArray(e) ? e : [e], t ? (this.__tlds__ = this.__tlds__.concat(e).sort().filter(function(n, c, r) {
        return n !== r[c - 1]
    }).reverse(), du(this), this) : (this.__tlds__ = e.slice(), this.__tlds_replaced__ = !0, du(this), this)
};
S.prototype.normalize = function(e) {
    e.schema || (e.url = "http://" + e.url), e.schema === "mailto:" && !/^mailto:/i.test(e.url) && (e.url = "mailto:" + e.url)
};
S.prototype.onCompile = function() {};
const H = 2147483647,
    I = 36,
    Nu = 1,
    uu = 26,
    vn = 38,
    Tn = 700,
    w0 = 72,
    S0 = 128,
    v0 = "-",
    In = /^xn--/,
    Rn = /[^\0-\x7F]/,
    On = /[\x2E\u3002\uFF0E\uFF61]/g,
    Bn = {
        overflow: "Overflow: input needs wider integers to process",
        "not-basic": "Illegal input >= 0x80 (not a basic code point)",
        "invalid-input": "Invalid input"
    },
    Du = I - Nu,
    R = Math.floor,
    Au = String.fromCharCode;

function M(u) {
    throw new RangeError(Bn[u])
}

function Mn(u, e) {
    const t = [];
    let n = u.length;
    for (; n--;) t[n] = e(u[n]);
    return t
}

function T0(u, e) {
    const t = u.split("@");
    let n = "";
    t.length > 1 && (n = t[0] + "@", u = t[1]), u = u.replace(On, ".");
    const c = u.split("."),
        r = Mn(c, e).join(".");
    return n + r
}

function I0(u) {
    const e = [];
    let t = 0;
    const n = u.length;
    for (; t < n;) {
        const c = u.charCodeAt(t++);
        if (c >= 55296 && c <= 56319 && t < n) {
            const r = u.charCodeAt(t++);
            (r & 64512) == 56320 ? e.push(((c & 1023) << 10) + (r & 1023) + 65536) : (e.push(c), t--)
        } else e.push(c)
    }
    return e
}
const Nn = u => String.fromCodePoint(...u),
    Ln = function(u) {
        return u >= 48 && u < 58 ? 26 + (u - 48) : u >= 65 && u < 91 ? u - 65 : u >= 97 && u < 123 ? u - 97 : I
    },
    s0 = function(u, e) {
        return u + 22 + 75 * (u < 26) - ((e != 0) << 5)
    },
    R0 = function(u, e, t) {
        let n = 0;
        for (u = t ? R(u / Tn) : u >> 1, u += R(u / e); u > Du * uu >> 1; n += I) u = R(u / Du);
        return R(n + (Du + 1) * u / (u + vn))
    },
    O0 = function(u) {
        const e = [],
            t = u.length;
        let n = 0,
            c = S0,
            r = w0,
            o = u.lastIndexOf(v0);
        o < 0 && (o = 0);
        for (let i = 0; i < o; ++i) u.charCodeAt(i) >= 128 && M("not-basic"), e.push(u.charCodeAt(i));
        for (let i = o > 0 ? o + 1 : 0; i < t;) {
            const a = n;
            for (let d = 1, f = I;; f += I) {
                i >= t && M("invalid-input");
                const b = Ln(u.charCodeAt(i++));
                b >= I && M("invalid-input"), b > R((H - n) / d) && M("overflow"), n += b * d;
                const h = f <= r ? Nu : f >= r + uu ? uu : f - r;
                if (b < h) break;
                const l = I - h;
                d > R(H / l) && M("overflow"), d *= l
            }
            const s = e.length + 1;
            r = R0(n - a, s, a == 0), R(n / s) > H - c && M("overflow"), c += R(n / s), n %= s, e.splice(n++, 0, c)
        }
        return String.fromCodePoint(...e)
    },
    B0 = function(u) {
        const e = [];
        u = I0(u);
        const t = u.length;
        let n = S0,
            c = 0,
            r = w0;
        for (const a of u) a < 128 && e.push(Au(a));
        const o = e.length;
        let i = o;
        for (o && e.push(v0); i < t;) {
            let a = H;
            for (const d of u) d >= n && d < a && (a = d);
            const s = i + 1;
            a - n > R((H - c) / s) && M("overflow"), c += (a - n) * s, n = a;
            for (const d of u)
                if (d < n && ++c > H && M("overflow"), d === n) {
                    let f = c;
                    for (let b = I;; b += I) {
                        const h = b <= r ? Nu : b >= r + uu ? uu : b - r;
                        if (f < h) break;
                        const l = f - h,
                            m = I - h;
                        e.push(Au(s0(h + l % m, 0))), f = R(l / m)
                    }
                    e.push(Au(s0(f, 0))), r = R0(c, s, i === o), c = 0, ++i
                }++c, ++n
        }
        return e.join("")
    },
    qn = function(u) {
        return T0(u, function(e) {
            return In.test(e) ? O0(e.slice(4).toLowerCase()) : e
        })
    },
    zn = function(u) {
        return T0(u, function(e) {
            return Rn.test(e) ? "xn--" + B0(e) : e
        })
    },
    M0 = {
        version: "2.3.1",
        ucs2: {
            decode: I0,
            encode: Nn
        },
        decode: O0,
        encode: B0,
        toASCII: zn,
        toUnicode: qn
    },
    Pn = {
        options: {
            html: !1,
            xhtmlOut: !1,
            breaks: !1,
            langPrefix: "language-",
            linkify: !1,
            typographer: !1,
            quotes: "“”‘’",
            highlight: null,
            maxNesting: 100
        },
        components: {
            core: {},
            block: {},
            inline: {}
        }
    },
    $n = {
        options: {
            html: !1,
            xhtmlOut: !1,
            breaks: !1,
            langPrefix: "language-",
            linkify: !1,
            typographer: !1,
            quotes: "“”‘’",
            highlight: null,
            maxNesting: 20
        },
        components: {
            core: {
                rules: ["normalize", "block", "inline", "text_join"]
            },
            block: {
                rules: ["paragraph"]
            },
            inline: {
                rules: ["text"],
                rules2: ["balance_pairs", "fragments_join"]
            }
        }
    },
    jn = {
        options: {
            html: !0,
            xhtmlOut: !0,
            breaks: !1,
            langPrefix: "language-",
            linkify: !1,
            typographer: !1,
            quotes: "“”‘’",
            highlight: null,
            maxNesting: 20
        },
        components: {
            core: {
                rules: ["normalize", "block", "inline", "text_join"]
            },
            block: {
                rules: ["blockquote", "code", "fence", "heading", "hr", "html_block", "lheading", "list", "reference", "paragraph"]
            },
            inline: {
                rules: ["autolink", "backticks", "emphasis", "entity", "escape", "html_inline", "image", "link", "newline", "text"],
                rules2: ["balance_pairs", "emphasis", "fragments_join"]
            }
        }
    },
    Hn = {
        default: Pn,
        zero: $n,
        commonmark: jn
    },
    Un = /^(vbscript|javascript|file|data):/,
    Gn = /^data:image\/(gif|png|jpeg|webp);/;

function Zn(u) {
    const e = u.trim().toLowerCase();
    return Un.test(e) ? Gn.test(e) : !0
}
const N0 = ["http:", "https:", "mailto:"];

function Vn(u) {
    const e = Tu(u, !0);
    if (e.hostname && (!e.protocol || N0.indexOf(e.protocol) >= 0)) try {
        e.hostname = M0.toASCII(e.hostname)
    } catch {}
    return nu(vu(e))
}

function Kn(u) {
    const e = Tu(u, !0);
    if (e.hostname && (!e.protocol || N0.indexOf(e.protocol) >= 0)) try {
        e.hostname = M0.toUnicode(e.hostname)
    } catch {}
    return U(vu(e), U.defaultChars + "%")
}

function v(u, e) {
    if (!(this instanceof v)) return new v(u, e);
    e || Ru(u) || (e = u || {}, u = "default"), this.inline = new cu, this.block = new pu, this.core = new Bu, this.renderer = new G, this.linkify = new S, this.validateLink = Zn, this.normalizeLink = Vn, this.normalizeLinkText = Kn, this.utils = Ye, this.helpers = hu({}, ut), this.options = {}, this.configure(u), e && this.set(e)
}
v.prototype.set = function(u) {
    return hu(this.options, u), this
};
v.prototype.configure = function(u) {
    const e = this;
    if (Ru(u)) {
        const t = u;
        if (u = Hn[t], !u) throw new Error('Wrong `markdown-it` preset "' + t + '", check name')
    }
    if (!u) throw new Error("Wrong `markdown-it` preset, can't be empty");
    return u.options && e.set(u.options), u.components && Object.keys(u.components).forEach(function(t) {
        u.components[t].rules && e[t].ruler.enableOnly(u.components[t].rules), u.components[t].rules2 && e[t].ruler2.enableOnly(u.components[t].rules2)
    }), this
};
v.prototype.enable = function(u, e) {
    let t = [];
    Array.isArray(u) || (u = [u]), ["core", "block", "inline"].forEach(function(c) {
        t = t.concat(this[c].ruler.enable(u, !0))
    }, this), t = t.concat(this.inline.ruler2.enable(u, !0));
    const n = u.filter(function(c) {
        return t.indexOf(c) < 0
    });
    if (n.length && !e) throw new Error("MarkdownIt. Failed to enable unknown rule(s): " + n);
    return this
};
v.prototype.disable = function(u, e) {
    let t = [];
    Array.isArray(u) || (u = [u]), ["core", "block", "inline"].forEach(function(c) {
        t = t.concat(this[c].ruler.disable(u, !0))
    }, this), t = t.concat(this.inline.ruler2.disable(u, !0));
    const n = u.filter(function(c) {
        return t.indexOf(c) < 0
    });
    if (n.length && !e) throw new Error("MarkdownIt. Failed to disable unknown rule(s): " + n);
    return this
};
v.prototype.use = function(u) {
    const e = [this].concat(Array.prototype.slice.call(arguments, 1));
    return u.apply(u, e), this
};
v.prototype.parse = function(u, e) {
    if (typeof u != "string") throw new Error("Input data should be a String");
    const t = new this.core.State(u, this, e);
    return this.core.process(t), t.tokens
};
v.prototype.render = function(u, e) {
    return e = e || {}, this.renderer.render(this.parse(u, e), this.options, e)
};
v.prototype.parseInline = function(u, e) {
    const t = new this.core.State(u, this, e);
    return t.inlineMode = !0, this.core.process(t), t.tokens
};
v.prototype.renderInline = function(u, e) {
    return e = e || {}, this.renderer.render(this.parseInline(u, e), this.options, e)
};
const Wn = new ae("AIzaSyDh-1n0rRs3lk7MWPyu_qlzX2DRNF3aByg");
async function Yn(u) {
    const e = Wn.getGenerativeModel({
            model: "gemini-pro"
        }),
        t = u;
    return (await e.generateContent(t)).response.text()
}

function Jn(u) {
    return u.value
}

function Qn() {
    let u = document.getElementById("question");
    if (u) return Jn(u);
    console.error("Element with ID 'question' not found.")
}
document.getElementById("submitButton").addEventListener("click", async function() {
    let u = document.getElementById("question");
    const e = document.getElementById("output");
    document.getElementById("aioutput"), document.getElementById("aiwrapper"), document.getElementById("userwrapper"), e.innerHTML += `<div class= "user ">${u.value}</div> <div class ="loader"></div>`;
    const t = Qn(),
        n = document.querySelectorAll(".loader");
    u.value = " ";
    try {
        const c = await Yn(t),
            r = v().render(c);
        n.forEach(function(o) {
            o.style.display = "none"
        }), e.innerHTML += `<div class="AI ">${r}</div>`
    } catch (c) {
        console.error("Error fetching the answer:", c), n.forEach(function(r) {
            r.style.display = "none"
        }), e.innerHTML += '<div class="AI ">Error try again</div>'
    }
});